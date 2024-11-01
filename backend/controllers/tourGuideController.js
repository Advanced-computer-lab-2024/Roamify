const bcrypt = require('bcrypt');
const validator = require('validator');
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNumber, yearsOfExperience, previousWork } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const existingProfile = await tourGuideModel.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already created" });
    }

    await userModel.findByIdAndUpdate(userId, { status: "active" });
    const newTourGuide = new tourGuideModel({
      mobileNumber,
      yearsOfExperience,
      previousWork,
      user: userId,
    });
    await newTourGuide.save();

    res.status(201).json({ message: "Tour guide profile created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create tour guide", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await tourGuideModel.findOne({ user: userId })
        .select('-_id -__v -createdAt -updatedAt')
        .populate({
          path: "user",
          select: "username email role -_id",
        });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const { username, email, role } = profile.user;
    res.status(200).json({
      username,
      email,
      role,
      mobileNumber: profile.mobileNumber,
      yearsOfExperience: profile.yearsOfExperience,
      previousWork: profile.previousWork,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNumber, yearsOfExperience, previousWork, oldPassword, newPassword, email } = req.body;

    const userUpdates = {};
    const tourGuideUpdates = {};

    const tourGuide = await tourGuideModel.findOne({ user: userId }).populate("user");
    if (!tourGuide) return res.status(404).json({ message: "Profile not found" });

    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, tourGuide.user.password);
      if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });
      if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ message: "New password does not meet security requirements" });
      }
      userUpdates.password = await bcrypt.hash(newPassword, 10);
    }

    if (email && email !== tourGuide.user.email) {
      if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format" });
      const emailExists = await userModel.findOne({ email });
      if (emailExists) return res.status(400).json({ message: "Email already in use" });
      userUpdates.email = email;
    }

    if (mobileNumber) tourGuideUpdates.mobileNumber = mobileNumber;
    if (yearsOfExperience) tourGuideUpdates.yearsOfExperience = yearsOfExperience;
    if (previousWork) tourGuideUpdates.previousWork = previousWork;

    await userModel.findByIdAndUpdate(userId, userUpdates);
    await tourGuideModel.findByIdAndUpdate(tourGuide._id, tourGuideUpdates);

    res.status(200).json({ message: "Tour guide profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

const createItinerary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { activities, language, price, availableDates, pickUpLocation, dropOffLocation, accessibility } = req.body;

    if (!activities || !language || price == null || !availableDates || !pickUpLocation || !dropOffLocation || accessibility == null) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const activityIds = [];
    const locations = [];
    const preferenceTags = [];

    for (const id of activities) {
      const activity = await activityModel.findById(id);
      if (!activity) return res.status(404).json({ message: `Activity with ID ${id} does not exist` });
      if (!activity.bookingAvailable) return res.status(400).json({ message: `Activity ${activity.name} is not available for booking` });
      activityIds.push(activity._id);
      locations.push(activity.location.name);
      activity.tags.forEach(tag => preferenceTags.push(tag));
    }

    const newItinerary = new itineraryModel({
      tourGuide: userId,
      activities: activityIds,
      language,
      price,
      availableDates,
      pickUpLocation,
      dropOffLocation,
      accessibility,
      locations,
      preferenceTags,
    });

    await newItinerary.save();
    res.status(201).json({ message: "Itinerary created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create itinerary", error: error.message });
  }
};

const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.itineraryId;
    const tourGuideId = req.user._id;
    const { activities, language, price, availableDates, pickUpLocation, dropOffLocation, accessibility, rating, booked } = req.body;

    const itinerary = await itineraryModel.findById(itineraryId).populate("tourGuide");
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    if (itinerary.tourGuide._id.toString() !== tourGuideId) {
      return res.status(403).json({ message: "You are not authorized to edit this itinerary" });
    }

    const updates = { language, price, availableDates, pickUpLocation, dropOffLocation, accessibility, rating, booked };
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
      updates.preferenceTags = preferenceTags;
    }

    await itineraryModel.findByIdAndUpdate(itineraryId, updates);
    res.status(200).json({ message: "Itinerary updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update itinerary", error: error.message });
  }
};

const deleteItinerary = async (req, res) => {
  try {
    const tourGuideId = req.user._id;
    const itineraryId = req.params.itineraryId;

    const itinerary = await itineraryModel.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    // Check if the current user is the owner of the itinerary
    if (itinerary.tourGuide.toString() !== tourGuideId) {
      return res.status(403).json({ message: "You are not authorized to delete this itinerary" });
    }

    await itineraryModel.findByIdAndDelete(itineraryId);
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete itinerary", error: error.message });
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
      return res.status(404).json({ message: "No itineraries found for this tour guide." });
    }

    res.status(200).json({ message: "Itineraries retrieved successfully", itineraries });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve itineraries", error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getMyItineraries
};
