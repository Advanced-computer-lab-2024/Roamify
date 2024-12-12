const validator = require('validator');
const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const receiptModel = require('../models/receiptModel')
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profilePicture');
const emailTemplate = require('../emailTemplate')
const nodemailer = require('nodemailer')

const updateItinerary = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start a transaction
  try {

    const itineraryId = req.params.itineraryId;
    const tourGuideId = req.user._id;
    const { activities, language, price, oldDate, newDate, pickUpLocation, dropOffLocation, accessibility, rating, booked } = req.body;

    if (!activities && !language && price === undefined && !oldDate && !newDate && !pickUpLocation && !dropOffLocation && accessibility === undefined && rating === undefined && booked === undefined) return res.status(400).json({ message: 'no data to edit' })
    const itinerary = await itineraryModel.findById(itineraryId).populate("tourGuide");
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    if (itinerary.tourGuide._id.toString() !== tourGuideId) {
      return res.status(403).json({ message: "You are not authorized to edit this itinerary" });
    }
    const today = new Date();
    today.setHours(0, 0, 0);

    const isOld = itinerary.availableDates.filter(d => d < today)

    if (isOld.length === itinerary.availableDates.length) return res.status(400).json({ message: 'this itinerary is old it can not be edited ' })

    const updates = { language, price, pickUpLocation, dropOffLocation, accessibility, rating, booked };
    const ticketQuery = {};
    const activityIds = [];
    const locations = [];
    const preferenceTags = [];

    if (activities) {
      for (const id of activities) {
        const activity = await activityModel.findById(id);
        if (!activity) return res.status(404).json({ message: `Activity with ID ${id} does not exist` });
        if (!activity.bookingAvailable) return res.status(400).json({ message: `Activity ${activity.name} is not available for booking` });
        activityIds.push(activity._id);
        locations.push(activity.location.name);
        activity.tags.forEach(tag => preferenceTags.push(tag));
      }
      updates.activities = activityIds;
      updates.locations = locations;
      ticketQuery.locations = locations
      updates.preferenceTags = preferenceTags;
    }

    if (oldDate && newDate) {

      const formattedOldDate = new Date(oldDate).toISOString().split('T')[0];
      const formattedNewDate = new Date(newDate);

      const dateIndex = itinerary.availableDates.findIndex(
        d => new Date(d).toISOString().split('T')[0] === formattedOldDate
      );
      if (dateIndex === -1) {
        return res.status(400).json({ message: 'Please specify a correct date to change.' });
      }
      if (new Date(oldDate) < today) {
        return res.status(400).json({ message: 'This itinerary date has passed; you cannot update it.' });
      }
      if (formattedNewDate < today) {
        return res.status(400).json({ message: 'Please enter a valid future date.' });
      }




      itinerary.availableDates[dateIndex] = formattedNewDate;
      await itinerary.save();
      ticketQuery.date = formattedNewDate

    }


    const itineraryTickets = await itineraryTicketModel.find({ itinerary: itineraryId, status: 'active' })

    if (itineraryTickets.length > 0) {
      for (t of itineraryTickets) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          }
        })
        const user = await userModel.findById(t.tourist)
        console.log(user)
        const text = emailTemplate.notifyBookedUsersForUpdateInItinerary(t.name, ticketQuery.date, user.username)
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: " Update: Your Upcoming itinerary has been updated!",
          text
        }
        await transporter.sendMail(mailOptions)
      }
    }


    await itineraryTicketModel.updateMany({ itinerary: itineraryId, status: 'active' }, ticketQuery, { session })
    await itineraryModel.findByIdAndUpdate(itineraryId, updates, { session });
    await session.commitTransaction();
    session.endSession()
    res.status(200).json({ message: "Itinerary updated successfully" });
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    session.endSession()
    res.status(500).json({ message: error.message });
  }
};
const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User authentication failed. Please log in and try again." });
    }

    const user = await userModel.findById(userId);

    if (user.status === "pending") {
      return res.status(403).json({ message: "Your account is pending admin approval. Please wait for approval before creating a profile." });
    }

    if (!user.termsAndConditions) {
      return res.status(400).json({ message: "You must accept the terms and conditions to create a profile." });
    }

    const existingProfile = await tourGuideModel.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "A profile already exists for this account. Duplicate profiles are not allowed." });
    }

    const { mobileNumber, yearsOfExperience, previousWork } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ message: "Mobile number is required to create a profile." });
    }

    await userModel.findByIdAndUpdate(userId, { status: "active" });

    const newTourGuide = new tourGuideModel({
      mobileNumber,
      yearsOfExperience,
      previousWork,
      user: userId,
    });

    await newTourGuide.save();

    res.status(201).json({ message: "Your tour guide profile has been created successfully!" });
  } catch (error) {
    console.error("Error creating tour guide profile:", error.message);
    res.status(500).json({ message: "An unexpected error occurred while creating your profile. Please try again later.", error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await tourGuideModel.findOne({ user: userId })
        .select('-_id -__v -createdAt -updatedAt ')
        .populate({
          path: "user",
          select: "username email role -_id ",
        });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found. Please create a profile to access your details." });
    }

    const { username, email, role } = profile.user;
    res.status(200).json({
      message: "Profile retrieved successfully.",
      data: {
        username,
        email,
        role,
        mobileNumber: profile.mobileNumber,
        yearsOfExperience: profile.yearsOfExperience,
        previousWork: profile.previousWork,
        profilePicture: profile.picture.url || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving the profile.", error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNumber, yearsOfExperience, previousWork, email } = req.body;

    const userUpdates = {};
    const tourGuideUpdates = {};

    const tourGuide = await tourGuideModel.findOne({ user: userId }).populate("user");
    if (!tourGuide) return res.status(404).json({ message: "Profile not found. Please create a profile to update your details." });

    if (email && email !== tourGuide.user.email) {
      if (!validator.isEmail(email)) return res.status(400).json({ message: "The provided email format is invalid. Please provide a valid email address." });
      const emailExists = await userModel.findOne({ email });
      if (emailExists) return res.status(400).json({ message: "The provided email address is already in use." });
      userUpdates.email = email;
    }

    if (mobileNumber) tourGuideUpdates.mobileNumber = mobileNumber;
    if (yearsOfExperience) tourGuideUpdates.yearsOfExperience = yearsOfExperience;
    if (previousWork) tourGuideUpdates.previousWork = previousWork;

    await userModel.findByIdAndUpdate(userId, userUpdates);
    await tourGuideModel.findByIdAndUpdate(tourGuide._id, tourGuideUpdates);

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the profile.", error: error.message });
  }
};
const createItinerary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, activities, language, price, availableDates, pickUpLocation, dropOffLocation, accessibility } = req.body;

    if (!name || !activities || !language || price == null || !availableDates || !pickUpLocation || !dropOffLocation || accessibility == null) {
      return res.status(400).json({ message: "Please fill in all the required fields to create an itinerary." });
    }

    const itinerary = await itineraryModel.findOne({ name });
    if (itinerary) return res.status(400).json({ message: "The itinerary name already exists. Please choose a different name." });

    const activityIds = [];
    const locations = [];
    const preferenceTags = [];

    for (const id of activities) {
      const activity = await activityModel.findById(id);
      if (!activity) return res.status(404).json({ message: `Activity with ID ${id} does not exist.` });
      if (!activity.bookingAvailable) return res.status(400).json({ message: `The activity "${activity.name}" is not available for booking.` });
      activityIds.push(activity._id);
      locations.push(activity.location.name);
      activity.tags.forEach(tag => preferenceTags.push(tag));
    }

    const newItinerary = new itineraryModel({
      tourGuide: userId,
      activities: activityIds,
      language,
      name,
      price,
      availableDates,
      pickUpLocation,
      dropOffLocation,
      accessibility,
      locations,
      preferenceTags,
    });

    await newItinerary.save();
    res.status(201).json({ message: "Itinerary created successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the itinerary.", error: error.message });
  }
};
const deleteItinerary = async (req, res) => {
  try {
    const tourGuideId = req.user._id;
    const itineraryId = req.params.itineraryId;

    const itinerary = await itineraryModel.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found." });

    if (itinerary.tourGuide.toString() !== tourGuideId) {
      return res.status(403).json({ message: "You are not authorized to delete this itinerary." });
    }

    const today = new Date();
    today.setHours(0, 0, 0);

    const itineraryTickets = await itineraryTicketModel.find({
      itinerary: itineraryId,
      status: 'active',
      date: { $gte: today }, // Ensures the date is today or in the future
    });

    if (itineraryTickets.length > 0) {
      return res.status(400).json({ message: "This itinerary has future bookings and cannot be deleted." });
    }

    await itineraryModel.findByIdAndDelete(itineraryId);
    res.status(200).json({ message: "Itinerary deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the itinerary.", error: error.message });
  }
};
const getMyItineraries = async (req, res) => {
  try {
    const tourGuideId = req.user._id;
    const itineraries = await itineraryModel
        .find({ tourGuide: tourGuideId })
        .select('-__v -createdAt -updatedAt')
        .populate({
          path: 'tourGuide',
          select: 'username email -_id',
          as: 'tourGuideInfo'  // Renames to tourGuideInfo
        })
        .populate({
          path: 'preferenceTags',
          select: 'name description -_id'
        })
        .populate({
          path: 'activities',
          select: 'name location bookingAvailable -_id',
          populate: {
            path: 'category',
            select: 'name -_id'
          }
        });

    if (!itineraries.length) {
      return res.status(404).json({ message: "No itineraries found. Start creating one to get started." });
    }

    res.status(200).json({ message: "Itineraries retrieved successfully.", itineraries });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving itineraries.", error: error.message });
  }
};
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please provide a profile picture to upload.' });
    }

    const file = req.file;
    let imageUrl;

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(new Error('Error uploading the profile picture.'));
            } else {
              imageUrl = { url: result.secure_url, publicId: result.public_id };
              resolve();
            }
          }
      );

      uploadStream.end(file.buffer);
    });

    await tourGuideModel.findOneAndUpdate({ user: req.user._id }, { picture: imageUrl });

    res.status(200).json({ message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload profile picture.', error: error.message });
  }
};
const setStatusOfItinerary = async (req, res) => {
  try {
    if (!req.body.itineraryId) return res.status(400).json({ message: 'Please specify an itinerary to update its status.' });
    const itineraryId = new mongoose.Types.ObjectId(req.body.itineraryId);
    const status = req.body.status;

    const itinerary = await itineraryModel.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: 'Invalid itinerary ID. Please choose a valid itinerary.' });
    if (req.user._id.toString() !== itinerary.tourGuide.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this itinerary.' });
    }

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Please choose either "active" or "inactive" status.' });
    }

    const itineraryTicket = await itineraryTicketModel.findOne({ itinerary: itineraryId, status: 'active' });
    if (!itineraryTicket && status === 'inactive') {
      return res.status(400).json({ message: 'Cannot deactivate an itinerary that has not been booked.' });
    }

    await itineraryModel.findByIdAndUpdate(itineraryId, { status });
    res.status(200).json({ message: `Itinerary status updated to "${status}" successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update itinerary status.', error: error.message });
  }
};
const viewRevenue = async (req, res) => {
  try {
    const tickets = await itineraryTicketModel.find({ status: 'active' });
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'You have no revenue yet.' });
    }

    let myTickets = await Promise.all(
        tickets.map(async t => {
          const itinerary = await itineraryModel.findById(t.itinerary);
          return itinerary.tourGuide.toString() === req.user._id.toString() ? t : null;
        })
    );
    myTickets = myTickets.filter(t => t !== null);

    const report = [];
    for (const ticket of myTickets) {
      const receipt = await receiptModel.findById(ticket.receipt);
      if (receipt && receipt.status === 'successful') {
        const itinerary = await itineraryModel.findById(ticket.itinerary);
        report.push({
          name: itinerary.name,
          price: receipt.price,
          date: ticket.date,
        });
      }
    }

    const map = new Map();
    for (const row of report) {
      const compositeKey = `${row.name}_${row.date}`;
      if (!map.has(compositeKey)) {
        map.set(compositeKey, { count: 1, price: row.price, date: row.date });
      } else {
        const entry = map.get(compositeKey);
        map.set(compositeKey, { count: entry.count + 1, price: row.price, date: row.date });
      }
    }

    const result = Array.from(map, ([name, data]) => ({
      name: name.split("_")[0],
      count: data.count,
      date: data.date,
      price: data.price,
    }));

    const date = req.query.date ? new Date(req.query.date) : null;
    const filteredResults = date
        ? result.filter(e => new Date(e.date).toISOString() === date.toISOString())
        : result;

    const totalRevenue = filteredResults.reduce((sum, e) => sum + (e.price * e.count), 0);

    return res.status(200).json({ message: 'Revenue retrieved successfully.', filteredResults, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve revenue.', error: error.message });
  }
};
const viewTotalTourists = async (req, res) => {
  try {
    const tickets = await itineraryTicketModel.find({ status: 'active' });

    let myTickets = await Promise.all(
        tickets.map(async t => {
          const itinerary = await itineraryModel.findById(t.itinerary);
          return itinerary.tourGuide.toString() === req.user._id.toString() &&
          new Date(t.date) < new Date().setHours(0, 0, 0, 0)
              ? t
              : null;
        })
    );
    myTickets = myTickets.filter(t => t !== null);

    if (!myTickets.length) {
      return res.status(404).json({ message: 'No tourists have used your itineraries yet.' });
    }

    const report = [];
    for (const t of myTickets) {
      const itinerary = await itineraryModel.findById(t.itinerary);
      report.push({
        name: itinerary.name,
        date: t.date,
      });
    }

    const map = new Map();
    for (const row of report) {
      const compositeKey = `${row.name}_${row.date}`;
      if (!map.has(compositeKey)) {
        map.set(compositeKey, { count: 1, date: row.date });
      } else {
        const entry = map.get(compositeKey);
        map.set(compositeKey, { count: entry.count + 1, date: row.date });
      }
    }

    const result = Array.from(map, ([name, data]) => ({
      name: name.split("_")[0],
      date: data.date,
      totalTourists: data.count,
    }));

    const month = req.query.month
        ? new Date(Date.parse(`${req.query.month} 1`)).getMonth()
        : null;

    const filteredResults = month !== null
        ? result.filter(t => new Date(t.date).getMonth() === month)
        : result;

    if (!filteredResults.length) {
      return res.status(404).json({ message: 'No results match your search criteria.' });
    }

    res.status(200).json({ message: 'Total tourists retrieved successfully.', filteredResults });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve total tourists.', error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getMyItineraries,
  upload,
  uploadProfilePicture,
  setStatusOfItinerary,
  viewRevenue,
  viewTotalTourists
};
