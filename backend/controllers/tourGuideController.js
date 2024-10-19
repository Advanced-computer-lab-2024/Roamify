const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const activityModel = require("../models/activityModel");
const PreferenceTag = require("../models/preferenceTagModel");
const itinearyModel = require("../models/itinearyModel");
const bcrypt = require('bcrypt');
const validator = require('validator');

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (userId) {
      const result = await tourGuideModel.findOne({ user: userId });
      if (result) {
        return res.status(400).json({ error: "profile already created" });
      }
    }

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
      .json({ message: "Created Tourguide successfully."});
  } catch (e) {
    res.status(401).json({ message: "failed to create tour guide",error:e.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);
    const details = await tourGuideModel.findOne({user:id})
    .select('-_id,-__v,-createdAt,-updatedAt')  // Excludes the id field from the tourguide model
    .populate({
      path: "user",
      select: "-_id -password -__v -createdAt -updatedAt"  // Excludes id, password, and Mongoose-generated fields
    });
  
    if (details) res.status(200).json({username:details.user.username,email:details.user.email,role:details.user.role,mobileNumber:details.mobileNumber,yearsOfExperience:details.yearsOfExperience,previousWork:details.previousWork});
    else {
      res.status(404).json({ message: "this profile does not exist" });
    }
  } catch (err) {
    res.status(404).json({ message: "failed to get profile", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try{
  const userId = req.user_id;

  const { mobileNumber, yearsOfExperience, previousWork, oldPassword,newPassword ,email } = req.body;

  const userUpdates = {};
  const tourGuideUpdates = {};

  const tourGuide = await tourGuideModel.findOne(userId).populate("user");

  if (!tourGuide) {
    res.status(400).json({ message: "cannot find this profile" });
  }

  const tourGuideId = tourGuide._id;

  if (oldPassword){
    const match = await  bcrypt.compare(oldPassword,tourGuide.user.password);
    if(!match)
      throw Error('password does not match old password');
    if(!validator.isStrongPassword(newPassword)){
      throw Error('password doesn\'t meet minimum requirements');
    }
    const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(newPassword,salt);
userUpdates.password = hash;

  }
  if (email) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser && email !== tourGuide.user.email) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if(!validator.isEmail(email)){
      throw Error('Email is not valid');
    }
    userUpdates.email = email;
  }

  if (mobileNumber) tourGuideUpdates.mobileNumber = mobileNumber;
  if (yearsOfExperience) tourGuideUpdates.yearsOfExperience = yearsOfExperience;
  if (previousWork) tourGuideUpdates.previousWork = previousWork;

  
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      userUpdates
    );
    const updatedTourGuide = await tourGuideModel.findByIdAndUpdate(
      tourGuideId,
      tourGuideUpdates
    );
    if (updatedUser || updatedTourGuide) {
      return res
        .status(200)
        .json({ message: "updated Tourguide successfully" });
    } else {
      return res.status(404).json({ message: "No updates made" });
    }
  } catch (e) {
    return res.status(400).json({ message: "failed", error: e.message });
  }
};

const createItinerary = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      activities,
      language,
      price,
      availableDates,
      pickUpLocation,
      dropOffLocation,
      accessibility,
    } = req.body;

    if(!activities || !language || !price || !availableDates || !pickUpLocation || !dropOffLocation || !dropOffLocation || !accessibility)
      throw Error("please fill all required fields");
    if (!activities)
      res.status(401).json({ error: "please select activities" });
    let locations = [];
    let prefTags = [];
    const activityIds = await Promise.all(
      activities.map(async (id) => {
      
        const activity = await activityModel.findById(id);
        if (!activity) {
          throw Error("some activities doesnt exist please make sure that all activities are available");
        }
        if(!activity.bookingAvailable)
          throw Error(`sorry this activity is not available for booking ${activity.name}`)
        locations.push(activity.location.name);
        
        const tag = activity.tags.forEach((t)=>{
          prefTags.push(t);
          console.log("tags "+t);
        })
       
      
        return activity._id;
      })
    );
    const itinerary = new itinearyModel({
      tourGuideId: userId,
      activities: activityIds,
      language: language,
      price: price,
      availableDates: availableDates,
      pickUpLocation: pickUpLocation,
      dropOffLocation: dropOffLocation,
      accessibility: accessibility,
      preferenceTags: prefTags,
      locations: locations,
    });
    await itinerary.save();
    res.status(200).json({ message: "Created itinerary successfully"});
  } catch (e) {
    res.status(401).json({ message: "Failed to create itinerary", error: e.message });
    console.log(e);
  }
};

const getItineraries = async (req, res) => {
  try {
    const itineraries = await itinearyModel
  .find()
  .select('-__v -createdAt -updatedAt')  // Exclude Mongoose-generated fields in the main query
  .populate({
    path: 'tourGuideId',
    select: 'username email -_id'  // Exclude password, role, and Mongoose-generated fields for tourGuide
  })
  .populate({
    path: 'preferenceTags',
    select: '-_id -__v'  // Exclude Mongoose-generated fields for preferenceTags
  })
  .populate({
    path: 'activities',
    select: ' -_id name'  // Exclude Mongoose-generated fields for activities
  });

    if (!itineraries)
      res.status(401).json({ message: "there are no itineraries" });
    else res.status(200).json(itineraries);
  } catch (e) {
    return res.status(500).json({ message: "failed", error: e.message });
  }
};

const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.itineraryId;
    const tourGuideId = req.user._id;

    console.log(tourGuideId);
    const itineary = await itinearyModel
      .findById(itineraryId)
      .populate("tourGuideId");

    if (!itineary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itineary.tourGuideId._id.toString() !== tourGuideId) {
      throw Error('you are not allowed to edit others itineraries');
    }

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
 

    // Update query fields
    if (language) query.language = language;
    if (price) query.price = price;
    if (availableDates) query.availableDates = availableDates;
    if (pickUpLocation) query.pickUpLocation = pickUpLocation;
    if (dropOffLocation) query.dropOffLocation = dropOffLocation;
    if (accessibility) query.accessibility = accessibility;
    if(booked) query.boooked = booked;      

    // Process activities
    if (activities) {
      const activityIds = await Promise.all(
        activities.map(async (id) => {
        
          const activity = await activityModel.findById(id);
          if (!activity) {
            throw Error("some activities doesnt exist please make sure that all activities are available");
          }
          if(!activity.bookingAvailable)
            throw Error(`sorry this activity is not available for booking ${activity.name}`)
          locations.push(activity.location.name);
          query.locations = locations;
          
          const tag = activity.tags.forEach((t)=>{
            prefTags.push(t);
            query.preferenceTags=prefTags;
            
          })
         
        
          return activity._id;
        })
        
       
       
      );
      query.activities = activityIds;
      
      
    }
    console.log(prefTags+"tag");
  


    if (rating) query.rating = rating;

    // Update the itinerary
    const updatedItineary = await itinearyModel
      .findByIdAndUpdate(itineraryId, query);
    

    return res
      .status(200)
      .json({ message: "Updated itineraryy successfully" });
  } catch (e) {
   
    return res
      .status(500)
      .json({  message: "Couldn't update itinerary", error: e.message});
  }
};

const deleteItinerary = async (req, res) => {
  try {
    const tourGuideId = req.user._id;
    const itineraryId = req.params.itineraryId;

    const itinerary = await itinearyModel
      .findById(itineraryId)
      .populate("tourGuideId");
    if (itinerary.tourGuideId._id.toString() === tourGuideId) {
      await activityModel.findByIdAndDelete(itineraryId);
      res.status(200).json({ message: "itineary deleted successfully" });
    } else {
     throw Error("you dont own this itinerary you cant delete it");
    }
  } catch (err) {
    res.status(500).json({error: err.message });
  }
};

const getMyItineraries = async (req, res) => {
  try {
    const tourGuideId = req.user._id;
    const itineraries = await itinearyModel
  .findOne({tourGuideId})
  .select('-__v -createdAt -updatedAt')  // Exclude Mongoose-generated fields in the main query
  .populate({
    path: 'tourGuideId',
    select: 'username email -_id'  // Exclude password, role, and Mongoose-generated fields for tourGuide
  })
  .populate({
    path: 'preferenceTags',
    select: '-_id -__v'  // Exclude Mongoose-generated fields for preferenceTags
  })
  .populate({
    path: 'activities',
    select: ' -_id name'  // Exclude Mongoose-generated fields for activities
  });

  if(!itineraries)
    throw Error("there are no itineraries for you yet");
    res.status(200).json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
  getMyItineraries
};
