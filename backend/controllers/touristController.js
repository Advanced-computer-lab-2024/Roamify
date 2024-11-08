const touristModel = require("../models/touristModel");
const transportationModel = require("../models/transportationModel");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");
const validator = require("validator");
const mongoose = require('mongoose');
const preferenceTagModel = require("../models/preferenceTagModel");
const receiptModel = require("../models/receiptModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const activityTicketModel = require("../models/activityTicket");

// Helper function to check if a user is an adult based on date of birth
function isAdult(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

// Create Profile
const createProfile = async (req, res) => {
  const id = req.user._id;

  // Check if a profile already exists for this user
  if (id) {
    const existingProfile = await touristModel.findOne({ user: id });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already created" });
    }
  }
  await userModel.findByIdAndUpdate(req.user._id, { status: 'active' });

  const { firstName, lastName, mobileNumber, nationality, dateOfBirth, occupation } = req.body;
  try {
    const adult = isAdult(dateOfBirth);

    let wallet = null;
    if (adult) {
      wallet = new walletModel({
        tourist: req.user._id
      })
      await wallet.save();
    }
    console.log(wallet)

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

// Get Profile
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const details = await touristModel
      .findOne({ user: id })
      .populate({
        path: "user",
        select: "username email role status", // Only include these fields from user
      })
      .populate(
        "wallet",
      )
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
      cardNumber: details.wallet?.cardNumber || "",
      cardValidUntil: details.wallet?.cardValidUntil || "",
      bookedItineraries: details.bookedItineraries,
      bookedActivities: details.bookedActivities
    };

    return res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const id = req.user._id;
  const { firstName, lastName, email, mobileNumber, nationality, occupation } = req.body;

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
    await touristModel.findByIdAndUpdate(tourist._id, touristUpdates, { new: true });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Failed to update profile", error: e.message });
  }
};



//repeat
const bookActivity = async (req, res) => {
  try {
    // Find the tourist by the user's ID
    const tourist = await touristModel.findOne({ user: req.user._id })
      .populate('wallet');
    if (!tourist) return res.status(404).json({ message: "Tourist does not exist" });


    const { activity, date } = req.body;
    if (!activity) return res.status(400).json({ message: "Please choose an activity to book" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    const activityId = new mongoose.Types.ObjectId(activity);
    const bookingDate = new Date(date);
    const activityObject = await activityModel.findById(activityId);


    const today = new Date();
    //checking that this is the correct dater for this activity
    if (new Date(activityObject.date).toISOString().split('T')[0] !== new Date(bookingDate).toISOString().split('T')[0]) {
      return res.status(400).json({ message: 'Please choose a valid date for this activity' });
    }



    //checking that date has not passed yet
    if (new Date(today).toISOString().split('T')[0] > new Date(bookingDate).toISOString().split('T')[0]) {
      return res.status(400).json({ message: 'Sorry, this activity is no longer available' });
    }


    const ticket = await activityTicketModel.findOne({ tourist: req.user._id, activity: activityId });

    //checking if user already has a ticket for this activity that is active
    if (ticket && ticket.status === 'active') {
      return res.status(400).json({ message: "Activity already booked for this date" });
    }

    let receipt = null;

    //checking if tourist has available credit
    if (tourist.wallet.availableCredit < activityObject.price) {
      receipt = new receiptModel({
        type: 'activity',
        status: 'failed',
        tourist: req.user._id,
        price: activityObject.price
      })
      await receipt.save();
      return res.status(400).json({ message: 'insufficient funds' })
    }

    //check if ticket was already made but refunded change it toactive
    if (ticket && ticket.status === 'refunded') {
      await activityTicketModel.updateOne({
        tourist: req.user._id,
        activity: activityId
      }, { status: 'active' });

    }
    //create a new ticket of does not exist
    else {
      const activityTicket = new activityTicketModel({
        tourist: req.user._id,
        activity: activityId,
        status: 'active',
        date: bookingDate
      })
      await activityTicket.save();
    }
    //create receipt for the transaction
    receipt = new receiptModel({
      type: 'activity',
      status: 'successfull',
      tourist: req.user._id,
      price: activityObject.price
    })
    await receipt.save();
    return res.status(200).json({ message: "Activity booked successfully" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error booking activity", error: error.message });
  }
};


//repeat
const bookItinerary = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id })
      .populate('wallet');
    if (!tourist) return res.status(404).json({ message: "Tourist does not exist" });

    const { itinerary, date } = req.body;
    if (!itinerary) return res.status(400).json({ message: "Itinerary is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    const itineraryId = new mongoose.Types.ObjectId(itinerary);

    const bookingDate = new Date(date);
    if (isNaN(bookingDate)) return res.status(400).json({ message: "Invalid date format" });

    const exists = tourist.bookedItineraries.some(
      (entry) =>
        entry.itinerary.equals(itineraryId) &&
        entry.date.getTime() === bookingDate.getTime()
    );

    const itineraryObject = await itineraryModel.findById(itineraryId).select('price');

    console.log(tourist)
    console.log(itineraryObject.price)


    if (tourist.wallet.availableCredit < itineraryObject.price) return res.status(400).json({ message: 'insufficient funds' })

    if (exists) {
      return res.status(400).json({ message: "Itinerary already booked for this date" });
    }

    const itineraryEntry = {
      itinerary: itineraryId,
      date: bookingDate,
    };

    await touristModel.updateOne(
      { user: req.user._id },
      { $addToSet: { bookedItineraries: itineraryEntry } }
    );

    return res.status(200).json({ message: "Itinerary booked successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error booking itinerary", error: error.message });
  }
};

//repeat
const cancelItinerary = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });
    const itineraryIdString = req.body.itineraryId;
    if (!itineraryIdString) return res.status(400).json({ message: 'please select an itinerary to cancel' });

    const date = new Date();
    for (itinerary of tourist.bookedItineraries) {
      if (itinerary.itinerary.toString() === itineraryIdString) {
        const timeDifference = itinerary.date.getTime() - date.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference <= 48) {
          return res.status(400).json({ message: "Unable to cancel booking as it must be done at least 48 hours in advance." });
        }
        else {
          await touristModel.updateOne(
            { user: req.user._id },
            { $pull: { bookedItineraries: { itinerary: itinerary.itinerary } } }
          );

          return res.status(200).json({ message: "Itinerary cancelled successfully." });
        }
      }
    }

    return res.status(404).json({ message: "Itinerary not found in bookings." });


  }
  catch (error) {
    return res.status(400).json({ message: 'error in cancelling itinerary', error: error.message })

  }
}

//repeat
const cancelActivity = async (req, res) => {
  try {
    const tourist = await touristModel.findOne({ user: req.user._id });
    const activityIdString = req.body.activityId;

    if (!activityIdString) {
      return res.status(400).json({ message: 'Please select an activity to cancel' });
    }

    const date = new Date();

    for (const activity of tourist.bookedActivities) {
      if (activity.activity.toString() === activityIdString) {
        const timeDifference = activity.date.getTime() - date.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);


        if (hoursDifference <= 48) {
          return res.status(400).json({ message: "Unable to cancel booking as it must be done at least 48 hours in advance." });
        } else {
          await touristModel.updateOne(
            { user: req.user._id },
            { $pull: { bookedActivities: { activity: activity.activity } } }
          );

          return res.status(200).json({ message: "Activity cancelled successfully." });
        }
      }
    }

    return res.status(404).json({ message: "Activity not found in bookings." });

  } catch (error) {
    return res.status(400).json({ message: 'Error in cancelling activity', error: error.message });
  }
};


const selectPreferenceTag = async (req, res) => {
  try {
    const preferences = req.body.preferences;
    const user = await userModel.findById(req.user._id);
    if (!preferences)
      throw Error('please select preferences');

    const preferenceIds = preferences.map(preference => new mongoose.Types.ObjectId(preference));
    const tourist = await touristModel.findOne({ user: req.user._id });

    for (preferenceId of preferenceIds) {
      const pTag = await preferenceTagModel.findById(preferenceId);
      if (!pTag) throw Error('please choose valid preference tags');
      else {
        if (!tourist.preferences.includes(preferenceId))
          tourist.preferences.push(preferenceId);

        else
          throw Error('preferenc already exists in your preferences please try again and select new preferences')
      }

    }
    await tourist.save();
    return res.status(200).json({ message: 'added preferences successfuly' });

  }
  catch (error) {
    res.status(400).json({ message: 'error in choosing preferences ', error: error.message });
  }
}


const cancelTransportationBooking = async (req, res) => {
  try {
    const transportationIdString = req.body.transportationId;

    // Check if transportation ID is provided
    if (!transportationIdString) {
      return res.status(400).json({ message: 'Please select one of your booked transportations to cancel.' });
    }

    const transportationId = new mongoose.Types.ObjectId(transportationIdString);

    // Find the transportation with the provided ID and check if the user has booked it
    const transportation = await transportationModel.findOne({ _id: transportationId, touristsBooked: req.user._id });

    // If the transportation is not found or the user has not booked it, return an error
    if (!transportation) {
      return res.status(400).json({ message: 'Please choose a valid booked transportation to cancel.' });
    }

    // Remove the user from the touristsBooked array
    await transportationModel.updateOne(
      { _id: transportationId },
      { $pull: { touristsBooked: req.user._id } }
    );

    return res.status(200).json({ message: 'Transportation booking cancelled successfully.' });

  } catch (error) {
    return res.status(500).json({ message: 'Error cancelling transportation booking', error: error.message });
  }
};


const getBookedTransportations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all transportations where the user's ID is in touristsBooked
    const transportations = await transportationModel.find({ touristsBooked: userId });

    if (!transportations) return res.status(400).json({ message: 'you have not booked any transportations yet' });
    return res.status(200).json({ transportations });
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching booked transportations', error: error.message });
  }
};

const getFilteredTransportations = async (req, res) => {
  try {
    const { pickupLocation, dropOffLocation, date, time, type, sortBy, sortOrder = "asc" } = req.query;

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
    const transportations = await transportationModel.find(filter)
      .sort(sortOptions)
      .populate({
        path: "advertiser",
        select: "name email" // Populate advertiser with specific fields
      });

    if (!transportations.length) {
      return res.status(404).json({ message: "No transportations found matching your criteria" });
    }

    res.status(200).json({ message: "Transportations retrieved successfully", transportations });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transportations", error: error.message });
  }
};



const bookTransportation = async (req, res) => {
  try {

    const tourist = await touristModel.findOne({ user: req.user._id })
      .populate('wallet');

    const transportationIdString = req.body.transportationIdString;
    if (!transportationIdString) throw Error('please pick a transportation');

    const transportationId = new mongoose.Types.ObjectId(transportationIdString);

    const transportation = await transportationModel.findById(transportationId);
    if (!transportation) throw Error("Invalid transportation");
    if (transportation.touristsBooked.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already booked this transportation" });
    }
    if (tourist.wallet.availableCredit < transportation.price) return res.status(400).json({ message: 'insufficient funds' })
    transportation.touristsBooked.push(req.user._id);
    await transportation.save();

    return res.status(200).json({
      message: "Transportation booked successfully"
    });

  }
  catch (error) {
    return res.status(400).json({ message: 'unable to book transportation', error: error.message })

  }
}

const getAllBookedItineraries = async (req, res) => {
  try {

    const tourist = await touristModel.findOne({ user: req.user._id }).populate('bookedItineraries.itinerary');
    if (!tourist) return res.status(400).json({ message: 'user does not exist' });

    if (tourist.bookedItineraries.length === 0) return res.status(400).json({ message: 'you have no itineraries booked yet' });

    return res.status(200).json(tourist.bookedItineraries);

  }
  catch (error) {
    return res.status(400).json({ message: 'couldn\'t retrieve booked itineraries', error: error.message });

  }
}
const getAllBookedActivities = async (req, res) => {
  try {

    const tourist = await touristModel.findOne({ user: req.user._id }).populate('bookedActivities.activity');

    if (!tourist) return res.status(400).json({ message: 'user does not exist' });

    if (tourist.bookedActivities.length === 0) return res.status(400).json({ message: 'you have no activities booked yet' });

    return res.status(200).json(tourist.bookedActivities);

  }
  catch (error) {
    return res.status(400).json({ message: 'couldn\'t retrieve booked activities', error: error.message });

  }
}

const getAllUpcomingBookedItineraries = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate('bookedItineraries.itinerary');

    if (!tourist) return res.status(400).json({ message: 'User does not exist' });

    const currentDate = new Date();

    // Filter bookedActivities for future dates
    const upcomingItineraries = tourist.bookedItineraries.filter(itinerary =>
      itinerary.date && itinerary.date > currentDate
    );

    if (upcomingItineraries.length === 0) {
      return res.status(200).json({ message: 'No upcoming booked itineraries' });
    }

    return res.status(200).json(upcomingItineraries);
  } catch (error) {
    return res.status(400).json({ message: "Couldn't retrieve booked itineraries", error: error.message });
  }
};
const getAllUpcomingBookedActivities = async (req, res) => {
  try {
    const tourist = await touristModel
      .findOne({ user: req.user._id })
      .populate('bookedActivities.activity'); // Populate activity details in bookedActivities

    if (!tourist) return res.status(400).json({ message: 'User does not exist' });

    const currentDate = new Date();

    // Filter bookedActivities for future dates
    const upcomingActivities = tourist.bookedActivities.filter(activity =>
      activity.date && activity.date > currentDate
    );

    if (upcomingActivities.length === 0) {
      return res.status(200).json({ message: 'No upcoming booked activities' });
    }

    return res.status(200).json(upcomingActivities);
  } catch (error) {
    return res.status(400).json({ message: "Couldn't retrieve booked activities", error: error.message });
  }
};


module.exports = { createProfile, getProfile, updateProfile, bookActivity, bookItinerary, selectPreferenceTag, bookTransportation, cancelItinerary, cancelActivity, getBookedTransportations, cancelTransportationBooking, getAllBookedActivities, getAllBookedItineraries, getAllUpcomingBookedActivities, getAllUpcomingBookedItineraries, getFilteredTransportations };
