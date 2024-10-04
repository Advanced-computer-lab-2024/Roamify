
const userModel = require('../models/userModel');
const tourGuideModel = require('../models/tourGuideModel');

const createProfile = async (req, res) => {
  //to be coded
  try{
    const userId = req.params.id;
    const {fName,lName,mobileNumber,yearsOfExperience,previousWork} = req.body;
    await userModel.findByIdAndUpdate(userId,{status:'active'});
    const newTourGuide = new tourGuideModel({
        user:userId,
        fName,
        lName,
        mobileNumber,
        yearsOfExperience,
        previousWork
    });
    await newTourGuide.save();
    res.status(200).json({message:'success',acceptedTourGuide:newTourGuide});


  }
  catch(e){
    res.status(404).json({message:'failed',error:e});

  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await tourGuideModel.findById(id).populate('user');
    if(details)
      res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message:"failed",error:e});
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

  
  const businessUserId = tourGuide.user._id;
  
  if (fName) tourGuideUpdates.fName = fName; 
  if (lName) tourGuideUpdates.lName = lName; 
  
  if (userName) {
    const result = await userModel.findOne({ userName: userName });
    if (result&&userName!=tourGuide.user.userName) {
      return res.status(400).json({ error: 'userName already exists' });
    } else {
      userUpdates.userName = userName;
    }
  }

  if (email) {
    const result = await userModel.findOne({ email: email });
    if (result&&email!=tourGuide.user.email) {
        return res.status(400).json({ error: 'email already exists' });
      

    } else {
      userUpdates.email = email;
    }
  }

  
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
//     const itineary = new Itineary({
//       ...req.body,
//       tourGuide: tourGuide._id // Associate the activity with the logged-in advertiser
//     });
//     const savedItineary = await Itineary.save();
//     res.status(201).json(savedItineary);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getItineary = async (req, res) => {
//   try {
//     const itineary = await Itineary.findOne({ _id: req.params.id, tourGuider: tourGuide._id });
//     if (!itineary) return res.status(404).json({ message: 'Activity not found or not authorized' });
//     res.json(itineary);
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
//     const itineary = await Itineary.findOneAndDelete({ _id: req.params.id, tourGuide: tourGuide._id }); // Find and delete activity by ID
//     if (!itineary) return res.status(404).json({ message: 'Activity not found' });
//     res.json({ message: 'Activity deleted successfully' }); // Respond with success message
//   } catch (err) {
//     res.status(500).json({ message: err.message }); // Handle errors
//   }
// };

// const getMyItinearies = async (req, res) => {
//   try {
//     const itinearies = await Itineary.find({ tourGuide: tourGuide._id });
//     res.json(itinearies);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
createProfile,
   getProfile,
updateProfile
//   createItineary,
//   getItineary,
//   updateItineary,
//   deleteItineary,
//   getMyItinearies
 };
