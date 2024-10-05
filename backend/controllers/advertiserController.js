const advertiserModel = require('../models/advertiserModel');
const userModel = require('../models/userModel');
const activityModel = require('../models/activityModel');

const createProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId) {
      const result = await advertiserModel.findOne({ user: userId });
      if ((result) && userId) {
        return res.status(400).json({ error: 'profile already created' });
      }
    } //check for existence of profile for this user

    const { fName, lName, websiteLink, hotline, companyProfile } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: 'active' });
    const newAdvertiser = new advertiserModel({
     
      fName,
      lName,
      websiteLink,
      hotline,
      companyProfile

    });
    await newAdvertiser.save();
    res.status(200).json({ message: 'success', acceptedUser: newAdvertiser });

  }
  catch (e) {
    res.status(404).json({ message: 'failed', error: e });
    console.log(e);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await advertiserModel.findById(id).populate('user');
    if (details)
      res.status(200).json(details);
    else {
      res.status(400).json({ message: "this profile does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed', error: e });
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
  if (!advertiser) {
    res.status(400).json({ message: "cannot find this profile" });
  }

  const businessUserId = advertiser.user._id;

  if (fName) advertiserUpdates.fName = fName;
  if (lName) advertiserUpdates.lName = lName;

  if (userName) {
    const result = await userModel.findOne({ userName: userName });
    if ((result) && result.userName != advertiser.user.userName) {
      return res.status(400).json({ error: 'username already exists' });
    } else {
      userUpdates.userName = userName;
    }
  }

  if (email) {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    const result = await userModel.findOne({ email: email });
    if ((result) && result.email != advertiser.user.email) {
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
    const updatedUser = await userModel.findByIdAndUpdate(businessUserId, userUpdates, { new: true });
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

const createActivity = async (req, res) => {
  try {
    const advertiserId = req.params.id;

    // this will never happen since the advertiser is the one sending the request so no need to verify

    // if (userId) {
    //   const result = await advertiserModel.findById(userId);
    //   if (!((result) && userId)) {
    //     return res.status(400).json({ error: 'advertiser does not exist' });
    //   }
    // } //check for existence of profile for this user

    const { date, time, location, price, category, tags, discounts, bookingAvailable } = req.body;
    const newActivity = new activityModel({
      date: date,
      time: time,
      location: location,
      price: price,
      category: category,
      tags: tags,
      discounts: discounts,
      bookingAvailable: bookingAvailable,
      advertiserId

    });
    await newActivity.save();
    res.status(200).json({ message: 'success', acceptedActivity: newActivity });

  }
  catch (e) {
    res.status(404).json({ message: 'failed', error: e });
    console.log(e);
  }
};

// i get my activity based on some query
const getActivity = async (req, res) => {
 try{
  const advertiserId = req.params.id;
  const query = {advertiser:advertiserId}


  const { date, time, location, price, category, tags, discounts } = req.body;
  if (date) query.date = date;
  if (time) query.time = time;
  if (location) query.location = location;
  if (price) query.price = price;
  if (category) query.category = category;
  if (tags) query.tags = { $in: tags }; // Assuming tags is an array
  if (discounts) query.discounts = discounts;
  const activities = await activityModel.find(query);
  return res.status(200).json(activities);
  } catch (e) {
    return res.status(500).json({ message: "failed",error:e });
  }


};


const updateActivity = async (req, res) => {
  try{
   const activityId = req.params.id;
   const query = {}
 
 
   const { date, time, location, price, category, tags, discounts } = req.body;
   if (date) query.date = date;
   if (time) query.time = time;
   if (location) query.location = location;
   if (price) query.price = price;
   if (category) query.category = category;
   if (tags) query.tags = { $in: tags }; // Assuming tags is an array
   if (discounts) query.discounts = discounts;
   const activities = await activityModel.findByIdAndUpdate(activityId,query,{new:true});
   return res.status(200).json({message:'successfully updated',activities});
   } catch (e) {
     return res.status(500).json({ message: "failed",error:e });
   }
 
 
 };
 

const deleteActivity = async (req, res) => {
  try {

    // we send here the activity id in the parameter
    const activityId = req.params.id;
    const activity = await activityModel.findByIdAndDelete(activityId); 
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ message:'activity doesnt exist' });
  }
};

const getMyActivities = async (req, res) => {
  try {
    const advertiserId = req.params.id;
    const activities = await activityModel.find({ advertiser:advertiserId });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  createActivity,
  getActivity,
     updateActivity,
  deleteActivity,
  getMyActivities
};