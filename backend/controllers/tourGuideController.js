const validator = require('validator');
const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const { name } = require('pug');
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).single('profilePicture'); // Accept only 1 file with field name 'profilePicture'

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (user.status === "pending")
      throw Error('pending admin approval');

    if (!user.termsAndConditions)
      throw Error('sorry you must accept our terms and conditions in order to proceed');
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
      .select('-_id -__v -createdAt -updatedAt ')
      .populate({
        path: "user",
        select: "username email role -_id ",
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
      profilePicture: profile.picture.url
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mobileNumber, yearsOfExperience, previousWork, email } = req.body;

    const userUpdates = {};
    const tourGuideUpdates = {};

    const tourGuide = await tourGuideModel.findOne({ user: userId }).populate("user");
    if (!tourGuide) return res.status(404).json({ message: "Profile not found" });



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
    const { name, activities, language, price, availableDates, pickUpLocation, dropOffLocation, accessibility } = req.body;

    if (!name || !activities || !language || price == null || !availableDates || !pickUpLocation || !dropOffLocation || accessibility == null) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const itinerary = await itineraryModel.findOne({ name });
    if (itinerary) return res.status(400).json({ message: 'this itinerary name already exists please choose another name' });

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
    res.status(201).json({ message: "Itinerary created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create itinerary", error: error.message });
  }
};

const updateItinerary = async (req, res) => {
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

    if (oldDate && newDate) {

      // Convert `oldDate` and `newDate` to comparable formats
      const formattedOldDate = new Date(oldDate).toISOString().split('T')[0];
      const formattedNewDate = new Date(newDate);

      console.log(formattedOldDate)
      console.log(formattedNewDate)

      // Check if `oldDate` exists in `availableDates`
      const isDateAvailable = itinerary.availableDates
        .some(d => new Date(d).toISOString().split('T')[0] === formattedOldDate);

      if (!isDateAvailable) {
        return res.status(400).json({ message: 'Please specify a correct date to change.' });
      }
      if (new Date(oldDate) < today) {
        return res.status(400).json({ message: 'This itinerary date has passed; you cannot update it.' });
      }
      if (formattedNewDate < today) {
        return res.status(400).json({ message: 'Please enter a valid future date.' });
      }

      // Update the date in `availableDates`
      const dateIndex = itinerary.availableDates.findIndex(
        d => new Date(d).toISOString().split('T')[0] === formattedOldDate
      );


      itinerary.availableDates[dateIndex] = formattedNewDate;
      await itinerary.save();
      const itineraryTickets = await itineraryTicketModel.find({ itinerary: itineraryId, status: 'active', date: oldDate })
      for (ticket of itineraryTickets) {
        ticket.date = formattedNewDate
        await ticket.save()
      }

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

    const today = new Date()
    today.setHours(0, 0, 0)
    const itineraryTickets = await itineraryTicketModel.find({
      itinerary: itineraryId,
      status: 'active',
      date: { $gte: today } // Ensures the date is today or in the future
    });
    if (itineraryTickets.length > 0) return res.status(400).json({ message: 'sorry this itinerary is booked in the future you are not allowed to delete it' })
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

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const file = req.file;
    let imageUrl;

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(new Error('Upload Error'));
          } else {
            imageUrl = { url: result.secure_url, publicId: result.public_id };
            resolve();
          }
        }
      );

      // Upload the file buffer directly to Cloudinary
      uploadStream.end(file.buffer);
    });

    await tourGuideModel.findOneAndUpdate({ user: req.user._id }, { picture: imageUrl });

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile picture', error: error.message });
  }
};

const setStatusOfItinerary = async (req, res) => {
  try {
    if (!req.body.itineraryId) throw Error('please choose an itinerary')
    const itineraryId = new mongoose.Types.ObjectId(req.body.itineraryId);
    const status = req.body.status;
    console.log(status)
    const itinerary = await itineraryModel.findById(itineraryId);
    if (!itinerary) throw Error('please choose a valid itinerary');
    if (req.user._id.toString() !== itinerary.tourGuide.toString()) return res.status(400).json({ message: 'you don\'t have the authority to do this action' })


    if (status !== "active" && status !== "inactive") throw Error('please choose to activate or deactivate your itinerary');
    const itineraryTicket = await itineraryTicketModel.findOne({ itinerary: itineraryId, status: 'active' })


    if (!itineraryTicket) return res.status(400).json({ message: 'can\'t deactivate itinerary since it has not been booked yet' })

    await itineraryModel.findByIdAndUpdate(itineraryId, { status });
    res.status(200).json({ message: 'changed status of itinerary to ' + status })

  }
  catch (error) {
    res.status(400).json({ message: 'could not change status due to errors', error: error.message })

  }
}


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
  setStatusOfItinerary
};
