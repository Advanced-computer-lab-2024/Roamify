const advertiser = require('../models/advertiserModel');
const Activity = require('../models/activityModel');

const getDetails = async (req, res) => {
  try {
    const details = await advertiser.findById(advertiser._id);
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateDetails = async (req, res) => {
  try {
    const details = await advertiser.findOneAndUpdate(
      { _id: advertiser._id },
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate the update
    );
    res.json(details);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ advertiser: advertiser._id });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, advertiser: advertiser._id });
    if (!activity) return res.status(404).json({ message: 'Activity not found or not authorized' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, advertiser: advertiser._id },
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate the update
    );

    if (!activity) return res.status(404).json({ message: 'Activity not found or not authorized' });

    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = new Activity({
      ...req.body,
      advertiser: advertiser._id // Associate the activity with the logged-in advertiser
    });
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({_id: req.params.id, advertiser: advertiser._id}); // Find and delete activity by ID
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
}

module.exports = {

  getDetails,
  updateDetails,
  getMyActivities,
  getActivity,
  updateActivity,
  createActivity,
  deleteActivity
  
};