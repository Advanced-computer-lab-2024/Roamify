const touristModel = require("../models/touristModel");
const transportationModel = require("../models/transportationModel");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");
const validator = require("validator");
const mongoose = require("mongoose");
const preferenceTagModel = require("../models/preferenceTagModel");
const receiptModel = require("../models/receiptModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const activityTicketModel = require("../models/activityTicketModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const placeTicketModel = require("../models/placeTicketModel");
const placeModel = require("../models/placeModel");
const nodemailer = require('nodemailer')
const emailTemplates = require('../emailTemplate')
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


function isAdult(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
}
const createProfile = async (req, res) => {
  const id = req.user._id;

  // Check if a profile already exists for this user
  if (id) {
    const existingProfile = await touristModel.findOne({ user: id });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already created" });
    }
  }
  await userModel.findByIdAndUpdate(req.user._id, { status: "active" });

  const {
    firstName,
    lastName,
    mobileNumber,
    nationality,
    dateOfBirth,
    occupation,
  } = req.body;
  try {
    const adult = isAdult(dateOfBirth);

    let wallet = null;
    if (adult) {
      wallet = new walletModel({
        tourist: req.user._id,
      });
      await wallet.save();
    }
    console.log(wallet);

    // Create and save a new tourist profile
    const tourist = new touristModel({
      user: id,
      firstName,
      lastName,
      mobileNumber,
      nationality,
      dateOfBirth,
      occupation,
      adult,
      wallet: wallet, // Setting wallet to null initially
    });
    await tourist.save();
    res.status(201).json({ message: "Created tourist successfully" });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const details = await touristModel
      .findOne({ user: id })
      .populate({
        path: "user",
        select: "username email role status", // Only include these fields from user
      })
      .populate("wallet")
      .select("-__v"); // Exclude Mongoose version key

    if (!details) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Construct response
    const responseData = {
      username: details.user.username,
      email: details.user.email,
      role: details.user.role,
      firstName: details.firstName,
      lastName: details.lastName,
      mobileNumber: details.mobileNumber,
      nationality: details.nationality,
      dateOfBirth: details.dateOfBirth,
      occupation: details.occupation,
      adult: details.adult,
      wallet: details.wallet

    };

    return res.status(200).json(responseData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};
const updateProfile = async (req, res) => {
  const id = req.user._id;
  const { firstName, lastName, email, mobileNumber, nationality, occupation } =
    req.body;

  const userUpdates = {};
  const touristUpdates = {};

  try {
    const tourist = await touristModel.findOne({ user: id }).populate("user");

    // Update tourist fields if provided
    if (firstName) touristUpdates.firstName = firstName;
    if (lastName) touristUpdates.lastName = lastName;
    if (mobileNumber) touristUpdates.mobileNumber = mobileNumber;
    if (nationality) touristUpdates.nationality = nationality;
    if (occupation) touristUpdates.occupation = occupation;

    // Check for and handle email update
    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== tourist.user.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
      }
      userUpdates.email = email;
    }

    // Perform updates
    await userModel.findByIdAndUpdate(id, userUpdates, { new: true });
    await touristModel.findByIdAndUpdate(tourist._id, touristUpdates, {
      new: true,
    });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Failed to update profile", error: e.message });
  }
};
const bookActivity = async (req, res) => {
  try {
    // Find the tourist by the user's ID
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    if (!tourist)
      throw Error('Tourist does not exist')

    const { activity, date, method, paymentMethodId } = req.body;
    if (!activity)
      throw Error('Please choose an activity to book')
    if (!date) throw Error('Date is required')
    if (method !== 'availableCredit' && method !== 'card') throw Error('please specify a correct method of payment')

    const activityId = new mongoose.Types.ObjectId(activity);
    const bookingDate = new Date(date);
    const activityObject = await activityModel.findById(activityId);

    const today = new Date();
    //checking that this is the correct dater for this activity
    if (
      new Date(activityObject.date).toISOString().split("T")[0] !==
      new Date(bookingDate).toISOString().split("T")[0]
    ) {
      throw Error('Please choose a valid date for this activity')
    }

    //checking that date has not passed yet
    if (
      new Date(today).toISOString().split("T")[0] >
      new Date(bookingDate).toISOString().split("T")[0]
    ) {
      throw Error('Sorry, this activity is no longer available')
    }

    const ticket = await activityTicketModel.findOne({
      tourist: req.user._id,
      activity: activityId,
    });

    //checking if user already has a ticket for this activity that is active
    if (ticket && ticket.status === "active") {
      throw Error('Activity already booked for this date')
    }

    let receipt = null;

    if (method == 'availableCredit') {
      if (tourist.wallet.availableCredit < activityObject.price) {
        receipt = new receiptModel({
          type: "activity",
          status: "failed",
          tourist: req.user._id,
          price: activityObject.price,
          receiptType: "payment",
        });
        await receipt.save();
        throw Error('Insufficient funds')
      }
      const availableCredit =
        tourist.wallet.availableCredit - activityObject.price;
      await walletModel.findByIdAndUpdate(tourist.wallet._id, {
        availableCredit,
      });
    }

    if (method == 'card') {
      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: activityObject.price * 100, // Amount in cents
        currency: 'usd', // Set the currency
        payment_method: paymentMethodId, // Pass the payment method ID from the frontend
        confirm: true, // Automatically confirm the payment
        return_url: 'https://yourfrontendurl.com/payment-success', // Replace with your frontend success page
      });
      //create receipt for the transaction


    }

    receipt = new receiptModel({
      type: "activity",
      status: "successful",
      tourist: req.user._id,
      price: activityObject.price,
      receiptType: "payment",
    });
    await receipt.save();

    //check if ticket was already made but refunded change it active
    if (ticket && ticket.status === "refunded") {
      await activityTicketModel.updateOne(
        {
          tourist: req.user._id,
          activity: activityId,
        },
        {
          status: "active",
          receipt: receipt._id,
        }
      );
    }
    //create a new ticket of does not exist
    else {
      const activityTicket = new activityTicketModel({
        tourist: req.user._id,
        activity: activityId,
        status: "active",
        receipt: receipt._id,
      });
      await activityTicket.save();
    }

    // Send  email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const user = await userModel.findById(req.user._id)

    const htmlContent = emailTemplates.bookedActivityEmail(activityObject.name, activityObject.date, receipt);
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Booked Activity",
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);



    //checking if tourist has available credit
    return res.status(200).json({ message: "Activity booked successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message });
  }
};
const bookPlace = async (req, res) => {
  try {
    // Find the tourist by the user's ID
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    if (!tourist)
      throw Error('Tourist does not exist')

    const { place, ticketType, amount, method, paymentMethodId } = req.body;
    if (!place)
      throw Error('Choose a place to visit')
    if (!ticketType)
      throw Error('Choose a ticket type')
    if (!amount)
      throw Error('Choose an amount')
    if (method !== 'availableCredit' && method !== 'card') throw Error('please specify a correct method of payment')

    const placeId = new mongoose.Types.ObjectId(place);
    const placeObject = await placeModel.findById(placeId);

    if (!placeObject) throw Error('Select a valid place')
    let receipt = null;

    let cost = placeObject.ticketPrice[ticketType];
    cost *= amount;

    if (method == 'availableCredit') {
      //checking if tourist has available credit
      if (tourist.wallet.availableCredit < cost) {
        receipt = new receiptModel({
          type: "place",
          status: "failed",
          tourist: req.user._id,
          price: cost,
          receiptType: "payment",
        });
        await receipt.save();
        return res.status(400).json({ message: "insufficient funds" });
      }
      const availableCredit = tourist.wallet.availableCredit - cost;
      await walletModel.findByIdAndUpdate(tourist.wallet._id, {
        availableCredit,
      });

    }

    if (method == 'card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: cost * 100, // Amount in cents
        currency: 'usd', // Set the currency
        payment_method: paymentMethodId, // Pass the payment method ID from the frontend
        confirm: true, // Automatically confirm the payment
        return_url: 'https://yourfrontendurl.com/payment-success', // Replace with your frontend success page
      });

    }

    //create receipt for the transaction
    receipt = new receiptModel({
      type: "place",
      status: "successful",
      tourist: req.user._id,
      price: cost,
      receiptType: "payment",
    });
    await receipt.save();



    const placeTicket = new placeTicketModel({
      tourist: req.user._id,
      place: placeId,
      status: "active",
      receipt: receipt._id,
      amount: amount,
    });
    await placeTicket.save();

    return res.status(200).json({ message: "place booked successfully" });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: error.message });
  }
};
const bookItinerary = async (req, res) => {
  try {
    // Find the tourist by the user's ID
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    if (!tourist)
      throw Error('Tourist does not exist')

    const { itinerary, date, method, paymentMethodId } = req.body;
    if (!itinerary)
      throw Error('Please choose an itinerary to book')
    if (!date) throw Error('Date is required')
    if (method !== 'availableCredit' && method !== 'card') throw Error('please specify a correct method of payment')
    const itineraryId = new mongoose.Types.ObjectId(itinerary);
    const bookingDate = new Date(date);
    const itineraryObject = await itineraryModel.findById(itineraryId);

    const today = new Date();
    //checking that this is the correct dater for this activity
    const isDateValid = itineraryObject.availableDates.some((date) => {
      const itineraryDateString = new Date(date).toISOString().split("T")[0];
      return (
        itineraryDateString ===
        new Date(bookingDate).toISOString().split("T")[0]
      );
    });
    if (!isDateValid) {
      throw Error('Please choose a valid date for this itinerary')
    }

    //checking that date has not passed yet
    if (
      new Date(today).toISOString().split("T")[0] >
      new Date(bookingDate).toISOString().split("T")[0]
    ) {
      throw Error('Sorry, this itinerary is no longer available')
    }

    const ticket = await itineraryTicketModel.findOne({
      tourist: req.user._id,
      itinerary: itineraryId,
    });

    //checking if user already has a ticket for this activity that is active
    if (ticket && ticket.status === "active" && new Date(ticket.date).toISOString().split("T")[0] === new Date(bookingDate).toISOString().split("T")[0]) {
      throw Error('Itinerary already booked for this date')
    }

    let receipt = null;

    if (method == 'availableCredit') {
      //checking if tourist has available credit
      if (tourist.wallet.availableCredit < itineraryObject.price) {
        receipt = new receiptModel({
          type: "itinerary",
          status: "failed",
          tourist: req.user._id,
          price: itineraryObject.price,
          receiptType: "payment",
        });
        await receipt.save();
        throw Error('Insufficient funds')
      }
      const availableCredit =
        tourist.wallet.availableCredit - itineraryObject.price;
      await walletModel.findByIdAndUpdate(tourist.wallet._id, {
        availableCredit,
      });
      console.log(111)
    }
    if (method == 'card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: itineraryObject.price * 100, // Amount in cents
        currency: 'usd', // Set the currency
        payment_method: paymentMethodId, // Pass the payment method ID from the frontend
        confirm: true, // Automatically confirm the payment
        return_url: 'https://yourfrontendurl.com/payment-success', // Replace with your frontend success page
      });

    }

    //create receipt for the transaction
    receipt = new receiptModel({
      type: "itinerary",
      status: "successful",
      tourist: req.user._id,
      price: itineraryObject.price,
      receiptType: "payment",
    });
    await receipt.save();



    //check if ticket was already made but refunded change it active
    if (ticket && ticket.status === "refunded") {
      await itineraryTicketModel.updateOne(
        {
          tourist: req.user._id,
          itinerary: itineraryId,
        },
        {
          status: "active",
          receipt: receipt._id,
          date: bookingDate,
        }
      );
    }
    //create a new ticket of does not exist
    else {
      const itineraryTicket = new itineraryTicketModel({
        tourist: req.user._id,
        itinerary: itineraryId,
        status: "active",
        receipt: receipt._id,
        date: bookingDate,
      });
      await itineraryTicket.save();
    }

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const user = await userModel.findById(req.user._id)

    const htmlContent = emailTemplates.bookedItineraryEmail(itineraryObject.name, date, receipt);
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Booked Activity",
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Itinerary booked successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message });
  }
};
const cancelActivity = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    const ticketIdString = req.body.ticketId;

    if (!ticketIdString) {
      return res
        .status(400)
        .json({ message: "Please select an activity to cancel" });
    }

    const date = new Date();

    const ticketId = new mongoose.Types.ObjectId(ticketIdString);

    const ticket = await activityTicketModel
      .findById(ticketId)
      .populate("receipt")
      .populate("activity");
    if (!ticket || ticket.status === "refunded")
      return res
        .status(400)
        .json({ message: "please choose a valid activity to cancel" });
    console.log(ticket);

    const timeDifference = ticket.activity.date.getTime() - date.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference <= 48) {
      return res
        .status(400)
        .json({
          message:
            "Unable to cancel booking as it must be done at least 48 hours in advance.",
        });
    } else {
      const receipt = new receiptModel({
        type: "activity",
        status: "successful",
        tourist: req.user._id,
        price: ticket.receipt.price,
        receiptType: "refund",
      });
      await receipt.save();
      await activityTicketModel.findByIdAndUpdate(ticket._id, {
        status: "refunded",
        receipt: receipt._id,
      });
      console.log(tourist.wallet.availableCredit, ticket.receipt.price);
      tourist.wallet.availableCredit += ticket.receipt.price;
      console.log(tourist.wallet.availableCredit);
      await walletModel.findByIdAndUpdate(tourist.wallet._id, {
        availableCredit: tourist.wallet.availableCredit,
      });

      return res
        .status(200)
        .json({ message: "Activity cancelled successfully." });
    }


  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message });
  }
};
const cancelPlace = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    const ticketIdString = req.body.ticketId;

    if (!ticketIdString) {
      return res
        .status(400)
        .json({ message: "Please select a place to cancel" });
    }

    const ticketId = new mongoose.Types.ObjectId(ticketIdString);

    const ticket = await placeTicketModel
      .findById(ticketId)
      .populate("receipt")
      .populate("place");
    if (!ticket || ticket.status === "refunded")
      return res
        .status(400)
        .json({ message: "please choose a valid place to cancel" });
    console.log(ticket);

    const receipt = new receiptModel({
      type: "place",
      status: "successful",
      tourist: req.user._id,
      price: ticket.receipt.price,
      receiptType: "refund",
    });
    await receipt.save();
    await placeTicketModel.findByIdAndUpdate(ticket._id, {
      status: "refunded",
      receipt: receipt._id,
    });
    tourist.wallet.availableCredit += ticket.receipt.price;
    await walletModel.findByIdAndUpdate(tourist.wallet._id, {
      availableCredit: tourist.wallet.availableCredit,
    });

    return res.status(200).json({ message: "place cancelled successfully." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in cancelling place", error: error.message });
  }
};
const cancelItinerary = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");
    const ticketIdString = req.body.ticketId;

    if (!ticketIdString) {
      return res
        .status(400)
        .json({ message: "Please select an itinerary to cancel" });
    }

    const date = new Date();

    const ticketId = new mongoose.Types.ObjectId(ticketIdString);

    const ticket = await itineraryTicketModel
      .findById(ticketId)
      .populate("receipt")
      .populate("itinerary");
    if (!ticket || ticket.status === "refunded")
      return res
        .status(400)
        .json({ message: "please choose a valid itinerary to cancel" });
    console.log(ticket);

    const timeDifference = ticket.date.getTime() - date.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference <= 48) {
      return res
        .status(400)
        .json({
          message:
            "Unable to cancel booking as it must be done at least 48 hours in advance.",
        });
    } else {
      const receipt = new receiptModel({
        type: "itinerary",
        status: "successful",
        tourist: req.user._id,
        price: ticket.receipt.price,
        receiptType: "refund",
      });
      await receipt.save();
      await itineraryTicketModel.findByIdAndUpdate(ticket._id, {
        status: "refunded",
        receipt: receipt._id,
      });
      console.log(tourist.wallet.availableCredit, ticket.receipt.price);
      tourist.wallet.availableCredit += ticket.receipt.price;
      console.log(tourist.wallet.availableCredit);
      await walletModel.findByIdAndUpdate(tourist.wallet._id, {
        availableCredit: tourist.wallet.availableCredit,
      });

      return res
        .status(200)
        .json({ message: "Itinerary cancelled successfully." });
    }

    return res.status(404).json({ message: "Activity not found in bookings." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in cancelling activity", error: error.message });
  }
};
const selectPreferenceTag = async (req, res) => {
  try {
    const preferences = req.body.preferences;
    const user = await userModel.findById(req.user._id);
    if (!preferences) throw Error("please select preferences");

    const preferenceIds = preferences.map(
      (preference) => new mongoose.Types.ObjectId(preference)
    );
    const tourist = await touristModel.findOne({ user: req.user._id });

    for (preferenceId of preferenceIds) {
      const pTag = await preferenceTagModel.findById(preferenceId);
      if (!pTag) throw Error("please choose valid preference tags");
      else {
        if (!tourist.preferences.includes(preferenceId))
          tourist.preferences.push(preferenceId);
        else
          throw Error(
            "preference already exists in your preferences please try again and select new preferences"
          );
      }
    }
    await tourist.save();
    return res.status(200).json({ message: "added preferences successfully" });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "error in choosing preferences ",
        error: error.message,
      });
  }
};
const cancelTransportationBooking = async (req, res) => {
  try {
    const transportationIdString = req.body.transportationId;

    // Check if transportation ID is provided
    if (!transportationIdString) {
      return res
        .status(400)
        .json({
          message:
            "Please select one of your booked transportations to cancel.",
        });
    }

    const transportationId = new mongoose.Types.ObjectId(
      transportationIdString
    );

    // Find the transportation with the provided ID and check if the user has booked it
    const transportation = await transportationModel.findOne({
      _id: transportationId,
      touristsBooked: req.user._id,
    });

    // If the transportation is not found or the user has not booked it, return an error
    if (!transportation) {
      return res
        .status(400)
        .json({
          message: "Please choose a valid booked transportation to cancel.",
        });
    }

    // Calculate the time difference between now and the transportation date
    const now = new Date();
    const transportationDate = new Date(transportation.date);
    const hoursUntilTransportation =
      (transportationDate - now) / (1000 * 60 * 60);

    // Check if the transportation is more than 48 hours away
    if (hoursUntilTransportation <= 48) {
      return res
        .status(400)
        .json({
          message:
            "Cancellations are only allowed more than 48 hours before the scheduled transportation.",
        });
    }

    // Remove the user from the touristsBooked array
    await transportationModel.updateOne(
      { _id: transportationId },
      { $pull: { touristsBooked: req.user._id } }
    );
    const receipt = new receiptModel({
      type: "transportation",
      status: "successful",
      receiptType: "refund",
      tourist: req.user._id,
      price: transportation.price,
    });
    await receipt.save();
    const wallet = await walletModel.findOne({ tourist: req.user._id });
    wallet.availableCredit += transportation.price;
    await wallet.save();

    return res
      .status(200)
      .json({ message: "Transportation booking cancelled successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error cancelling transportation booking",
        error: error.message,
      });
  }
};
const getBookedTransportations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all transportations where the user's ID is in touristsBooked
    const transportations = await transportationModel.find({
      touristsBooked: userId,
    });

    if (!transportations)
      return res
        .status(400)
        .json({ message: "you have not booked any transportations yet" });
    return res.status(200).json({ transportations });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Error fetching booked transportations",
        error: error.message,
      });
  }
};
const getBookedFutureTransportations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get the current date and set time to midnight for a clean comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all transportations where the user's ID is in touristsBooked and date is in the future
    const transportations = await transportationModel.find({
      touristsBooked: userId,
      date: { $gt: today },
    });

    if (!transportations || transportations.length === 0) {
      return res
        .status(400)
        .json({ message: "You have no future transportation bookings." });
    }

    return res.status(200).json({ transportations });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Error fetching future booked transportations",
        error: error.message,
      });
  }
};
const getFilteredTransportations = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropOffLocation,
      date,
      time,
      type,
      sortBy,
      sortOrder = "asc",
    } = req.query;

    let filter = {};

    // Filter by pickup location if provided
    if (pickupLocation) {
      filter.pickupLocation = { $regex: pickupLocation, $options: "i" }; // Case-insensitive search
    }

    // Filter by drop-off location if provided
    if (dropOffLocation) {
      filter.dropOffLocation = { $regex: dropOffLocation, $options: "i" }; // Case-insensitive search
    }

    // Filter by date if provided (any date on or after the specified date)
    if (date) {
      filter.date = { $gte: new Date(date) };
    }

    // Filter by exact time if provided
    if (time) {
      filter.time = time;
    }

    // Filter by type if provided (e.g., bus, train, etc.)
    if (type) {
      filter.type = type;
    }

    // Sorting options
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    // Execute the query with the defined filters
    const transportations = await transportationModel
      .find(filter)
      .sort(sortOptions)
      .populate({
        path: "advertiser",
        select: "name email", // Populate advertiser with specific fields
      });

    if (!transportations.length) {
      return res
        .status(404)
        .json({ message: "No transportations found matching your criteria" });
    }

    res
      .status(200)
      .json({
        message: "Transportations retrieved successfully",
        transportations,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve transportations",
        error: error.message,
      });
  }
};
const bookTransportation = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate("wallet");

    const { transportationIdString, method, paymentMethodId } = req.body;
    if (!transportationIdString) throw Error("please pick a transportation");
    if (method !== 'availableCredit' && method !== 'card') throw Error('please specify a correct method of payment')

    const transportationId = new mongoose.Types.ObjectId(
      transportationIdString
    );


    const transportation = await transportationModel.findById(transportationId);
    if (!transportation) throw Error("Invalid transportation");
    if (transportation.touristsBooked.includes(req.user._id)) {
      throw Error('you have already booked this transportation')
    }

    if (method == 'availableCredit') {
      if (tourist.wallet.availableCredit < transportation.price) {
        const receipt = new receiptModel({
          type: "transportation",
          status: "failed",
          tourist: req.user._id,
          price: transportation.price,
          receiptType: "payment",
        });
        await receipt.save();
        throw Error('Insufficient funds')
      }
      const wallet = await walletModel.findById(tourist.wallet._id);

      wallet.availableCredit -= transportation.price;
      await tourist.save();
      await wallet.save();

    }

    if (method == 'card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: transportation.price * 100, // Amount in cents
        currency: 'usd', // Set the currency
        payment_method: paymentMethodId, // Pass the payment method ID from the frontend
        confirm: true, // Automatically confirm the payment
        return_url: 'https://yourfrontendurl.com/payment-success', // Replace with your frontend success page
      });

    }
    transportation.touristsBooked.push(req.user._id);
    await transportation.save();
    const receipt = new receiptModel({
      type: "transportation",
      status: "successful",
      tourist: req.user._id,
      price: transportation.price,
      receiptType: "payment",
    });
    await receipt.save();


    return res.status(200).json({
      message: "Transportation booked successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message });
  }
};
const getAllBookedActivities = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });

    if (!tourist)
      throw Error('user does not exist')
    let activityTickets = await activityTicketModel
      .find({ tourist: req.user._id, status: "active" })
      .populate("activity", "date time name location.name"); // Specify the fields you want to include
    const filteredActivityTickets = activityTickets.filter(t => t.activity.date < new Date());
    if (filteredActivityTickets.length === 0)
      throw Error('no booked activities yet')
    return res.status(200).json(filteredActivityTickets);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message,
      });
  }
};
const getAllBookedPlaces = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });

    if (!tourist)
      return res.status(400).json({ message: "user does not exist" });

    const placesTickets = await placeTicketModel
      .find({ tourist: req.user._id, status: "active" })
      .populate("place"); // Specify the fields you want to include
    if (placesTickets.length === 0)
      return res.status(400).json({ message: "no booked places yet" });
    return res.status(200).json(placesTickets);
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "couldn't retrieve booked places",
        error: error.message,
      });
  }
};
const getAllBookedItineraries = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });

    if (!tourist)
      throw Error('user does not exist')

    const itineraryTickets = await itineraryTicketModel
      .find({
        tourist: req.user._id,
        status: "active",
        date: { $lt: new Date() } // Condition to check if the date is in the past
      }).populate("itinerary", "name locations"); // Specify the fields you want to include
    if (itineraryTickets.length === 0)
      throw Error('you have no itineraries that you have booked in the past')
    return res.status(200).json(itineraryTickets);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message

      });
  }
};
const getAllUpcomingBookedActivities = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });

    if (!tourist)
      throw Error('user does not exist')

    const currentDate = new Date();

    const activityTickets = await activityTicketModel
      .find({ tourist: req.user._id, status: "active" })
      .populate("activity", "date time name location.name"); // Specify the fields you want to include

    // Filter bookedActivities for future dates
    const upcomingActivities = activityTickets.filter(
      (ticket) => ticket.activity.date && ticket.activity.date > currentDate
    );

    if (upcomingActivities.length === 0) {
      throw Error('no upcoming booked Activities')
    }

    return res.status(200).json(upcomingActivities);
  } catch (error) {
    return res
      .status(400)
      .json({
        message: error.message
      });
  }
};
const getAllUpcomingBookedItineraries = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });

    if (!tourist)
      throw Error('user does not exist')

    const currentDate = new Date();

    const itineraryTickets = await itineraryTicketModel
      .find({ tourist: req.user._id, status: "active" })
      .populate("itinerary", "name locations"); // Specify the fields you want to include

    // Filter bookedActivities for future dates
    const upcomingItineraries = itineraryTickets.filter(
      (ticket) => ticket.date && ticket.date > currentDate
    );

    if (upcomingItineraries.length === 0) {
      throw Error('no upcoming booked itineraries')
    }

    return res
      .status(200)
      .json(upcomingItineraries);
  } catch (error) {
    return res
      .status(400)
      .json({
        message: error.message
      });
  }
};
const viewPointsLevel = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });
    if (!tourist)
      return res.status(400).json({ message: "user doesn't exist" });

    return res
      .status(200)
      .json({ level: tourist.level, points: tourist.points });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "couldn't retrieve points and level" });
  }
};
const redeemPoints = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });
    if (!tourist)
      return res.status(400).json({ message: "user doesn't exist" });
    const points = req.body.points;
    if (!points)
      return res
        .status(400)
        .json({ message: "please select points to redeem" });

    if (points < 100)
      return res
        .status(400)
        .json({ message: "sorry 100 you must redeem atleast 100 points" });
    const touristPoints = tourist.points;
    if (touristPoints < points)
      return res.status(400).json({ message: "sorry you don't have points" });

    const cach = points / 100;

    tourist.points -= points;
    await tourist.save();

    const wallet = await walletModel.findOne({ tourist: req.user._id });
    wallet.availableCredit += cach;
    await wallet.save();
    return res.status(200).json({ message: `redeemed ${points} successfully` });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in redeeming points", error: error.message });
  }
};

const getWallet = async (req, res) => {
  try {

    const tourist = await touristModel.findOne({ user: req.user._id }).populate('wallet')

    if (!tourist) return res.status(400).json({ message: 'user does not exist' })

    return res.status(200).json(tourist.wallet)

  }
  catch (error) {
    return res.status(400).json({ message: 'error could not retrieve wallet' })
  }
}

const viewTotalRefundedReceipts = async (req, res) => {
  try {

    const activityTickets = await activityTicketModel.find({ tourist: req.user._id, status: 'refunded' }).populate('receipt')
    const itineraryTickets = await itineraryTicketModel.find({ tourist: req.user._id, status: 'refunded' }).populate('receipt')

    const result = {}
    let totalActivityRefund = 0;
    let totalItineraryRefund = 0;


    activityTickets.forEach(t => totalActivityRefund += t.receipt.price)
    itineraryTickets.forEach(t => totalItineraryRefund += t.receipt.price)

    result.refundedActivitiesAmount = totalActivityRefund
    result.refundedItinerariesAmount = totalItineraryRefund
    result.total = totalActivityRefund + totalItineraryRefund

    return res.status(200).json(result)

  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  bookActivity,
  bookItinerary,
  selectPreferenceTag,
  bookTransportation,
  cancelItinerary,
  cancelActivity,
  getBookedTransportations,
  cancelTransportationBooking,
  getAllBookedActivities,
  getAllBookedItineraries,
  getAllUpcomingBookedActivities,
  getAllUpcomingBookedItineraries,
  getFilteredTransportations,
  viewPointsLevel,
  redeemPoints,
  getBookedFutureTransportations,
  bookPlace,
  cancelPlace,
  getAllBookedPlaces,
  getWallet,
  viewTotalRefundedReceipts
};
