const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const activityModel = require("../models/activityModel");
const PreferenceTag = require("../models/preferenceTagModel");
const itinearyModel = require("../models/itinearyModel");

const createProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId) {
      const result = await tourGuideModel.findOne({ user: userId });
      if (result && userId) {
        return res.status(400).json({ error: "profile already created" });
      }
    }
    console.log("Here!");

    const { mobileNumber, yearsOfExperience, previousWork } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: "active" });
    const newTourGuide = new tourGuideModel({
      mobileNumber,
      yearsOfExperience,
      previousWork,
      user: userId,
    });
    await newTourGuide.save();
    res
      .status(200)
      .json({ message: "success", acceptedTourGuide: newTourGuide });
  } catch (e) {
    res.status(404).json({ message: "failed" });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await tourGuideModel.findById(id).populate("user");
    if (details) res.status(200).json(details);
    else {
      res.status(400).json({ message: "this profile does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed", error: e });
  }
};

const updateProfile = async (req, res) => {
  const tourGuideId = req.params.id;

  const { mobileNumber, yearsOfExperience, previousWork } = req.body;

  const userUpdates = {};
  const tourGuideUpdates = {};

  const tourGuide = await tourGuideModel.findById(tourGuideId).populate("user");
  if (!tourGuide) {
    res.status(400).json({ message: "cannot find this profile" });
  }

  const businessUserId = tourGuide.user._id;

  // if (userName) {
  //   const result = await userModel.findOne({ userName: userName });
  //   if (result && result.userName != tourGuide.user.userName) {
  //     return res.status(400).json({ error: "username already exists" });
  //   } else {
  //     userUpdates.userName = userName;
  //   }
  // } // corrected logic of username existence validation

  // if (email) {
  //   const emailRegex = /.+@.+\..+/;
  //   if (!emailRegex.test(email)) {
  //     return res
  //       .status(400)
  //       .json({ error: "Please enter a valid email address" });
  //   }
  //   const result = await userModel.findOne({ email: email });
  //   if (result && result.email != tourGuide.user.email) {
  //     return res.status(400).json({ error: "email already exists" });
  //   } else {
  //     userUpdates.email = email;
  //   }
  // } // corrected logic of email existence validation

  // if (password) userUpdates.password = password;
  if (mobileNumber) tourGuideUpdates.mobileNumber = mobileNumber;
  if (yearsOfExperience) tourGuideUpdates.yearsOfExperience = yearsOfExperience;
  if (previousWork) tourGuideUpdates.previousWork = previousWork;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      businessUserId,
      userUpdates,
      { new: true }
    );
    const updatedTourGuide = await tourGuideModel.findByIdAndUpdate(
      tourGuideId,
      tourGuideUpdates,
      { new: true }
    );
    if (updatedUser || updatedTourGuide) {
      return res
        .status(200)
        .json({ message: "updated", updatedTourGuide: updatedTourGuide });
    } else {
      return res.status(404).json({ message: "No updates made" });
    }
  } catch (e) {
    return res.status(400).json({ message: "failed", error: e });
  }
};

const createItineary = async (req, res) => {
  try {
    const tourGuideId = req.params.id;

    const {
      activities,
      language,
      price,
      availableDates,
      pickUpLocation,
      dropOffLocation,
      accessibility,
    } = req.body;

    if (!activities)
      res.status(401).json({ error: "please select activities" });
    let locations = [];
    let prefTags = [];
    const activityIds = await Promise.all(
      activities.map(async (name) => {
        const activity = await activityModel.findOne({ name });
        locations.push(activity.location.name);
        prefTags.push(activity.tag);
        if (!activity) {
          res.status(401).json({ error: "this activity doesnt exist" });
        }
        return activity._id;
      })
    );

    const newItineary = new itinearyModel({
      tourGuideId: tourGuideId,
      activities: activityIds,
      language: language,
      price: price,
      availableDates: availableDates,
      pickUpLocation: pickUpLocation,
      dropOffLocation: dropOffLocation,
      accessibility: accessibility,
      preferenceTag: prefTags,
      locations: locations,
    });
    await newItineary.save();
    const itineary = await itinearyModel
      .findById(newItineary)
      .populate("tourGuideId")
      .populate("activities")
      .populate("preferenceTags");
    res.status(200).json({ message: "success", acceptedItineary: itineary });
  } catch (e) {
    res.status(404).json({ message: "failed", error: e });
    console.log(e);
  }
};

const getItinearies = async (req, res) => {
  try {
    const itinearis = await itinearyModel
      .find()
      .populate("tourGuideId")
      .populate("activities")
      .populate("preferenceTags");
    if (!itinearis)
      res.status(401).json({ message: "there are no itinearies" });
    else res.status(200).json(itinearis);
  } catch (e) {
    return res.status(500).json({ message: "failed", error: e });
  }
};

const updateItineary = async (req, res) => {
  try {
    const itinearyId = req.params.itinearyId;
    const tourGuideId = req.params.tourGuideId;

    const itineary = await itinearyModel
      .findById(itinearyId)
      .populate("tourGuideId");
    if (!itineary.tourGuideId._id.toString() === tourGuideId)
      return res
        .status(401)
        .json({ message: "you are niot allowed to edit others itinearies" });
    const {
      activities,
      language,
      price,
      availableDates,
      pickUpLocation,
      dropOffLocation,
      accessibility,
      rating,
      booked,
    } = req.body;
    const query = {};
    let locations = [];
    let prefTags = [];
    let activityIds = null;

    if (language) query.language = language;
    if (price) query.price = price;
    if (availableDates) query.availableDates = availableDates;
    if (pickUpLocation) query.pickUpLocation = pickUpLocation;
    if (dropOffLocation) query.dropOffLocation = dropOffLocation;
    if (accessibility) query.accessibility = accessibility;
    if (activities) {
      activityIds = await Promise.all(
        activities.map(async (name) => {
          const activity = await activityModel.findOne({ name });

          if (!activity) {
            res.status(401).json({ error: "this activity doesnt exist" });
          }
          locations.push(activity.location.name);
          prefTags.push(activity.tag);
          return activity._id;
        })
      );

      query.activities = activityIds;
      query.locations = locations;
      query.preferenceTags = prefTags;
    }
    if (booked) query.booked = booked;
    if (rating) query.rating = rating;

    const updatedItineary = await itinearyModel
      .findByIdAndUpdate(itinearyId, query, { new: true })
      .populate("tourGuideId")
      .populate("activities")
      .populate("preferenceTags");

    res.status(200).json({ message: "updated", itineary: updatedItineary });
  } catch (e) {
    res.status(401).json({ error: e, message: "couldnt update itineary" });
    console.log(e);
  }
};

const deleteItineary = async (req, res) => {
  try {
    const tourGuideID = req.params.tourGuideId;
    const itinearyId = req.params.itinearyId;

    const itineary = await itinearyModel
      .findById(itinearyId)
      .populate("tourGuideId");
    if (itineary.booked)
      return res
        .status(401)
        .json({ messages: "you cant delete a booked itinerary" });

    if (itineary.tourGuideId._id.toString() === tourGuideID) {
      await itinearyModel.findByIdAndDelete(itinearyId);
      return res
        .status(200)
        .json({ message: "Itinerary deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this itinerary" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "couldnt delete", error: err.message });
  }
};

const getMyItinearies = async (req, res) => {
  try {
    const tourGuideId = req.params.id;
    const itinearies = await itinearyModel
      .find({ tourGuideId })
      .populate("tourGuideId")
      .populate("activities")
      .populate("preferenceTags");
    res.status(200).json(itinearies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  createItineary,
  getItinearies,
  updateItineary,
  deleteItineary,
  getMyItinearies,
};
