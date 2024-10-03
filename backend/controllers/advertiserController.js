const advertiserModel = require('../models/advertiserModel');
const businessUserModel = require('../models/businessUserModel');
const Activity = require('../models/activityModel');

const createProfile = async (req, res) => {
  try{
    const userId = req.params.id;
   
    const { websiteLink,hotline,companyProfile } = req.body;
    await businessUserModel.findByIdAndUpdate(userId, { status: 'active' });
    const newAdvertiser = new advertiserModel({
        user: userId,
        websiteLink,
        hotline,
        companyProfile

    });
    await newAdvertiser.save();
    res.status(200).json({message:'success',acceptedUser:newAdvertiser});

  }
  catch(e){
    res.status(404).json({message:'failed',error:e});
    console.log(e);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await advertiserModel.findById(id).populate('user');
    if(details)
      res.status(200).json(details);
  } catch (err) {
    res.status(500).json({message:'failed',error:e});
  }
};

const updateProfile = async (req, res) => {
  const advertiserId = req.params.id;
  
  const {
    fName,
    lName,
    userName,
    email,
    password,
    websiteLink,
    hotline,
    companyProfile
  } = req.body;

  const userUpdates = {};
  const advertiserUpdates = {};
  
  const advertiser = await advertiserModel.findById(advertiserId).populate('user'); 

  
  const businessUserId = advertiser.user._id;
  
  if (fName) userUpdates.fName = fName; 
  if (lName) userUpdates.lName = lName; 
  
  if (userName) {
    const result = await businessUserModel.findOne({ userName: userName });
    if (result&&userName!=advertiser.user.userName) {
      return res.status(400).json({ error: 'userName already exists' });
    } else {
      userUpdates.userName = userName;
    }
  }

  if (email) {
    const result = await businessUserModel.findOne({ email: email });
    if (result&&email!=advertiser.user.email) {
        return res.status(400).json({ error: 'email already exists' });
      

    } else {
      userUpdates.email = email;
    }
  }

  
  if (password) userUpdates.password = password;
  if (websiteLink) advertiserUpdates.websiteLink = websiteLink;
  if (hotline) advertiserUpdates.hotline = hotline;
  if (companyProfile) advertiserUpdates.companyProfile = companyProfile;

  try {
    const updatedUser = await businessUserModel.findByIdAndUpdate(businessUserId, userUpdates, { new: true });
    const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(advertiserId, advertiserUpdates, { new: true });

    if (updatedUser || updatedAdvertiser) {
      return res.status(200).json({ message: 'updated', updatedAdvertiser: updatedAdvertiser });
    } else {
      return res.status(404).json({ message: 'No updates made' });
    }
  } catch (e) {
    return res.status(400).json({ message: 'failed', error: e });
  }
};

// const createActivity = async (req, res) => {
//   try {
//     const activity = new Activity({
//       ...req.body,
//       advertiser: advertiser._id // Associate the activity with the logged-in advertiser
//     });
//     const savedActivity = await activity.save();
//     res.status(201).json(savedActivity);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findOne({ _id: req.params.id, advertiser: advertiser._id });
//     if (!activity) return res.status(404).json({ message: 'Activity not found or not authorized' });
//     res.json(activity);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findOneAndUpdate(
//       { _id: req.params.id, advertiser: advertiser._id },
//       req.body,
//       { new: true, runValidators: true } // Return the updated document and validate the update
//     );

//     if (!activity) return res.status(404).json({ message: 'Activity not found or not authorized' });

//     res.json(activity);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const deleteActivity = async (req, res) => {
//   try {
//     const activity = await Activity.findOneAndDelete({ _id: req.params.id, advertiser: advertiser._id }); // Find and delete activity by ID
//     if (!activity) return res.status(404).json({ message: 'Activity not found' });
//     res.json({ message: 'Activity deleted successfully' }); // Respond with success message
//   } catch (err) {
//     res.status(500).json({ message: err.message }); // Handle errors
//   }
// };

// const getMyActivities = async (req, res) => {
//   try {
//     const activities = await Activity.find({ advertiser: advertiser._id });
//     res.json(activities);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  createProfile,
  getProfile,
  updateProfile
//   createActivity,
//   getActivity,
//   updateActivity,
//   deleteActivity,
//   getMyActivities,
};