const advertiserModel = require("../models/advertiserModel");
const userModel = require("../models/userModel");
const activityModel = require("../models/activityModel");
const tagModel = require("../models/preferenceTagModel");
const categoryModel = require("../models/categoryModel");

const createProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId) {
      const result = await advertiserModel.findOne({ user: userId });
      if (result && userId) {
        return res.status(400).json({ error: "profile already created" });
      }
    } //check for existence of profile for this user

    const {companyName, websiteLink, hotline, companyProfile } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: "active" });
    const newAdvertiser = new advertiserModel({
     companyName,
      websiteLink,
      hotline,
      companyProfile,
      user: userId,
    });
    await newAdvertiser.save();
    res.status(200).json({ message: "success", acceptedUser: newAdvertiser });
  } catch (e) {
    res.status(404).json({ message: "failed", error: e });
    console.log(e);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await advertiserModel.findById(id).populate("user");
    if (details) res.status(200).json(details);
    else {
      res.status(400).json({ message: "this profile does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed", error: e });
  }
};

const updateProfile = async (req, res) => {
  const advertiserId = req.params.id;

  const { companyName, websiteLink, hotline, companyProfile } =
    req.body;

  const userUpdates = {};
  const advertiserUpdates = {};

  const advertiser = await advertiserModel
    .findById(advertiserId)
    .populate("user");
  if (!advertiser) {
    res.status(400).json({ message: "cannot find this profile" });
  }

  const businessUserId = advertiser.user._id;
if(companyName) advertiserUpdates.companyName = companyName;
  if (websiteLink) advertiserUpdates.websiteLink = websiteLink;
  if (hotline) advertiserUpdates.hotline = hotline;
  if (companyProfile) advertiserUpdates.companyProfile = companyProfile;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      businessUserId,
      userUpdates,
      { new: true }
    );
    const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(
      advertiserId,
      advertiserUpdates,
      { new: true }
    );

    if (updatedUser || updatedAdvertiser) {
      return res
        .status(200)
        .json({ message: "updated", updatedAdvertiser: updatedAdvertiser });
    } else {
      return res.status(404).json({ message: "No updates made" });
    }
  } catch (e) {
    return res.status(400).json({ message: "failed", error: e });
  }
};

const createActivity = async (req, res) => {
  try {
    const advertiserId = req.params.id;

    const { name, date, time, location, price, category, tagPlace, discounts } =
      req.body;

    const tags = await tagModel.find({ name: { $in: tagPlace } }).select("_id");
    const categoryId = await categoryModel
      .findOne({ name: category })
      .select("_id");
    const categoryIdFinal = categoryId.id;

    // Extract the ObjectId values from the result
    const tagIds = tags.map((tag) => tag._id);

    const newActivity = new activityModel({
      name,
      date,
      time,
      location: {
        type: location.type, // 'Point' is the default type, but you can specify it if needed
        coordinates: location.coordinates,
        name: location.name, // [longitude, latitude] format
      },
      price,
      category: categoryIdFinal,
      tag: tagIds,
      discounts,
      advertiser: advertiserId,
    });

    await newActivity.save();
    const populatedActivity = await activityModel
      .findById(newActivity._id)
      .populate("category")
      .populate("tag")
      .populate("advertiser");

    res
      .status(200)
      .json({ message: "success", acceptedActivity: populatedActivity });
  } catch (e) {
    if (e.code === 11000) {
      // Duplicate key error
      res.status(400).json({
        message:
          "Duplicate activity name detected. Please use a different name.",
      });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create activity", error: e.message });
      console.log(e);
    }
  }
};

const getActivities = async (req, res) => {
  try {
    const advertiserId = req.params.id;
    const query = { advertiser: advertiserId };

    const { name, date, time, location, price, category, discounts, tag } =
      req.body;

    if (date) query.date = date;
    if (time) query.time = time;
    if (location) query.location = location;
    if (name) query.name = name;
    if (price) query.price = price;

    if (category) {
      const c = await categoryModel.findOne({ name: category }).select("_id");
      query.category = c ? c._id : null;
    }

    if (discounts) query.discounts = discounts;

    if (tag) {
      const tagIds = await tagModel.find({ name: { $in: tag } }).select("_id");
      if (tagIds.length > 0) {
        query.tag = { $in: tagIds.map((t) => t._id) }; // Change to $in operator for matching any tag
      }
    }

    const activities = await activityModel
      .find(query)
      .populate("advertiser")
      .populate("tag")
      .populate("category");

    return res.status(200).json(activities);
  } catch (e) {
    return res.status(500).json({ message: "failed", error: e });
  }
};

const updateActivity = async (req, res) => {
  try {
    const activityId = req.params.id;
    const query = {};

    const { name, date, time, location, price, category, tagPlace, discounts } =
      req.body;
    if (date) query.date = date;
    if (time) query.time = time;
    if (location)
      query.location = {
        type: "Point",
        coordinates: location.coordinates,
      };
    if (price) query.price = price;
    if (category) {
      const c = await categoryModel.findOne({ name: category }).select("_id");
      query.category = c ? c._id : null;
    }
    if (tagPlace) {
      const tagIds = await tagModel.find({ name: { $in: tag } }).select("_id");
      query.tag = tagIds.map((t) => t._id);
    }
    if (name) query.name = name;
    if (discounts) query.discounts = discounts;
    const activities = await activityModel
      .findByIdAndUpdate(activityId, query, { new: true })
      .populate("category")
      .populate("tag")
      .populate("advertiser");
    return res
      .status(200)
      .json({ message: "successfully updated", activities });
  } catch (e) {
    console.log(e);
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.activityid;
    const advertiserId = req.params.advertiserid;

    const activity = await activityModel
      .findById(activityId)
      .populate("advertiser");

    // Check if the advertiserId matches the one in the activity
    if (activity.advertiser._id.toString() === advertiserId) {
      await activityModel.findByIdAndDelete(activityId);
      res.status(200).json({ message: "Activity deleted successfully" });
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this activity" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMyActivities = async (req, res) => {
  try {
    const advertiserId = req.params.id;
    const activities = await activityModel
      .find({ advertiser: advertiserId })
      .populate("category")
      .populate("tag")
      .populate("advertiser");

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
  getMyActivities,
  updateActivity,
  deleteActivity,
  getActivities,
};
