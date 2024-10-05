const userModel = require('../models/userModel');
const tourGuideModel = require('../models/tourGuideModel');
//const itinearyModel = require('../models/itinearyModel');

const createProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId) {
      const result = await tourGuideModel.findOne({ user: userId });
      if ((result) && userId) {
        return res.status(400).json({ error: 'profile already created' });
      }
    } //check for existence of profile for this user

    const { fName, lName, mobileNumber, yearsOfExperience, previousWork } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: 'active' });
    const newTourGuide = new tourGuideModel({
      
      fName,
      lName,
      mobileNumber,
      yearsOfExperience,
      previousWork
    });
    await newTourGuide.save();
    res.status(200).json({ message: 'success', acceptedTourGuide: newTourGuide });


  }
  catch (e) {
    res.status(404).json({ message: 'failed', error: e });

  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await tourGuideModel.findById(id).populate('user');
    if (details)
      res.status(200).json(details);
    else {
      res.status(400).json({ message: "this profile does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed", error: e });
  }
};

const updateProfile = async (req, res) => {
  const tourGuideId = req.params.id;

  const {
    fName,
    lName,
    userName,
    email,
    password,
    mobileNumber,
    yearsOfExperience,
    previousWork
  } = req.body;

  const userUpdates = {};
  const tourGuideUpdates = {};

  const tourGuide = await tourGuideModel.findById(tourGuideId).populate('user');
  if (!tourGuide) {
    res.status(400).json({ message: "cannot find this profile" });
  }

  const businessUserId = tourGuide.user._id;

  if (fName) tourGuideUpdates.fName = fName;
  if (lName) tourGuideUpdates.lName = lName;

  if (userName) {
    const result = await userModel.findOne({ userName: userName });
    if ((result) && result.userName != tourGuide.user.userName) {
      return res.status(400).json({ error: 'username already exists' });
    } else {
      userUpdates.userName = userName;
    }
  } // corrected logic of username existence validation

  if (email) {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    const result = await userModel.findOne({ email: email });
    if ((result) && result.email != tourGuide.user.email) {
      return res.status(400).json({ error: 'email already exists' });
    } else {
      userUpdates.email = email;
    }
  } // corrected logic of email existence validation


  if (password) userUpdates.password = password;
  if (mobileNumber) tourGuideUpdates.mobileNumber = mobileNumber;
  if (yearsOfExperience) tourGuideUpdates.yearsOfExperience = yearsOfExperience;
  if (previousWork) tourGuideUpdates.previousWork = previousWork;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(businessUserId, userUpdates, { new: true });
    const updatedTourGuide = await tourGuideModel.findByIdAndUpdate(tourGuideId, tourGuideUpdates, { new: true });
    if (updatedUser || updatedTourGuide) {
      return res.status(200).json({ message: 'updated', updatedTourGuide: updatedTourGuide });
    } else {
      return res.status(404).json({ message: 'No updates made' });
    }
  } catch (e) {
    return res.status(400).json({ message: 'failed', error: e });
  }
};

// const createItineary = async (req, res) => {
//   try {
//     const tourGuideId = req.params.id;

  

//     const { activities, locations, timeline, duration, language, price, availableDates, accessibility, pickUp, dropOff } = req.body;
//     const newItineary = new itinearyModel({
//       activities: activities,
//       locations: locations,
//       timeline: timeline,
//       duration: duration,
//       language: language,
//       price: price,
//       availableDates: availableDates,
//       accessibility: accessibility,
//       pickUp: pickUp,
//       dropOff: dropOff,
//       user: tourGuideId

//     });
//     await newItineary.save();
//     res.status(200).json({ message: 'success', acceptedItineary: newItineary });

//   }
//   catch (e) {
//     res.status(404).json({ message: 'failed', error: e });
//     console.log(e);
//   }
// };

//similar to get activity logic i just need the new sche,ma
// const getItineary = async (req, res) => {
//   try {
//     const itineary = await itinearyModel.findOne({ _id: req.params.id });
//     if (!itineary) return res.status(404).json({ message: 'Itineary not found' });
//     res.status(200).json({ itineary: itineary });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateItineary = async (req, res) => {
//   try {
//     const itineary = await Itineary.findOneAndUpdate(
//       { _id: req.params.id, tourGuide: tourGuide._id },
//       req.body,
//       { new: true, runValidators: true } // Return the updated document and validate the update
//     );

//     if (!itineary) return res.status(404).json({ message: 'Activity not found or not authorized' });

//     res.json(itineary);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const deleteItineary = async (req, res) => {
//   try {
//     const itenaryId = req.params.id;
//     const itineary = await itinearyModel.findByIdAndDelete(itenaryId); // Find and delete itineary by ID
//     //We neet to validate that this tourguide owns it
   
//     res.status(200).json({ message: 'Itineary deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getMyItinearies = async (req, res) => {
//   try {
//     const tourGuideId = req.params.id;
//     const itinearies = await itinearyModel.findById({ user:tourGuideId});
//     res.status(200).json(itinearies);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  createProfile,
  getProfile,
  updateProfile
  // createItineary,
  //getItineary,
  //   updateItineary,
  // deleteItineary,
  // getMyItinearies
};
