const validator = require('validator');

const advertiserModel = require("../models/advertiserModel");
const transportationModel = require("../models/transportationModel");
const userModel = require("../models/userModel");
const activityModel = require("../models/activityModel");
const preferenceTagModel = require('../models/preferenceTagModel');
const categoryModel = require("../models/categoryModel");
const activityTicketModel = require("../models/activityTicketModel");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const receiptModel = require('../models/receiptModel');
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).single('logo'); // Accept only 1 file with field name 'profilePicture'

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (user.status === "pending")
      throw Error('pending admin approval');

    if (!user.termsAndConditions)
      throw Error('sorry you must accept our terms and conditions in order to proceed');
    const { companyName, websiteLink, hotline, companyProfile } = req.body;

    if (userId) {
      const result = await advertiserModel.findOne({ user: userId, companyName });
      if (result && userId) {
        return res.status(400).json({ error: "profile already created" });
      }
    } //check for existence of profile for this user

    if (!companyName || !websiteLink || !hotline || !companyProfile)
      throw Error('please fill all fields');
    await userModel.findByIdAndUpdate(userId, { status: "active" });
    const newAdvertiser = new advertiserModel({
      companyName,
      websiteLink,
      hotline,
      companyProfile,
      user: userId,
    });
    await newAdvertiser.save();
    res.status(201).json({ message: "Created advertiser successfully" });
  } catch (e) {
    res.status(404).json({ message: "failed", error: e.message });
    console.log(e);
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const details = await advertiserModel.findOne({ user: id }).populate({
      path: 'user',
      select: 'username email role password status' // Only return these fields from the user
    });
    return res.status(200).json({ username: details.user.username, email: details.user.email, role: details.user.role, companyName: details.companyName, companyProfile: details.companyProfile, websiteLink: details.websiteLink, hotline: details.hotline, logo: details.logo.url });

  } catch (err) {
    res.status(401).json({ message: "failed", error: err.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;

    const { companyName, websiteLink, hotline, companyProfile, email } = req.body;

    const userUpdates = {};
    const advertiserUpdates = {};

    const advertiser = await advertiserModel
      .findOne({ user: id })
      .populate("user");
    if (!advertiser) {
      res.status(400).json({ message: "cannot find this profile" });
    }

    if (companyName) advertiserUpdates.companyName = companyName;
    if (websiteLink) advertiserUpdates.websiteLink = websiteLink;
    if (hotline) advertiserUpdates.hotline = hotline;
    if (companyProfile) advertiserUpdates.companyProfile = companyProfile;

    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== advertiser.user.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
      }
      userUpdates.email = email;
    }

    const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(
      advertiser._id,
      advertiserUpdates
    );
    const updatedUser = await userModel.findByIdAndUpdate(id, userUpdates);

    if (updatedAdvertiser || updatedUser) {
      return res
        .status(200)
        .json({ message: "updated advertiser successfully" });
    } else {
      return res.status(404).json({ message: "No updates made" });
    }
  } catch (e) {
    return res.status(400).json({ message: "failed to update advertiser", error: e.message });
  }
};
const createActivity = async (req, res) => {
  try {
    const advertiserId = req.user._id;

    const {
      name,
      date,
      time,
      location,
      price,
      category,
      preferenceTags,
      discounts,
      bookingAvailable,
    } = req.body;

    // Validate required fields
    if (!name || !date || !time || !location || !price || !category || !preferenceTags) {
      throw new Error("Please fill all required fields");
    }

    // Check for duplicate activity name
    const existingActivity = await activityModel.findOne({ name });
    if (existingActivity) {
      return res.status(400).json({ message: "Activity with this name already exists. Please choose a different name." });
    }

    // Validate and format location coordinates
    if (!location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ message: "Location coordinates must be in the format [longitude, latitude]" });
    }
    const [longitude, latitude] = location.coordinates;
    if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      return res.status(400).json({ message: "Invalid coordinates: longitude must be between -180 and 180, latitude between -90 and 90" });
    }

    // Validate date is in the future
    const currentDate = new Date();
    const activityDate = new Date(date);
    if (activityDate < currentDate) {
      return res.status(400).json({ message: "Please enter a future date" });
    }

    // Retrieve ObjectIds for category and preference tags
    const categoryDoc = await categoryModel.findOne({ _id: category });
    if (!categoryDoc) return res.status(400).json({ message: "Invalid category selected" });

    const tagDocs = await preferenceTagModel.find({ _id: { $in: preferenceTags } });
    if (tagDocs.length !== preferenceTags.length) {
      return res.status(400).json({ message: "Some preference tags are invalid" });
    }

    // Extract ObjectIds for tags
    const tagIds = tagDocs.map((tag) => tag._id);

    // Create new activity
    const newActivity = new activityModel({
      name,
      date,
      time,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
        name: location.name,
      },
      price,
      category: categoryDoc._id,
      tags: tagIds,
      discounts,
      bookingAvailable,
      advertiser: advertiserId,
    });

    await newActivity.save();

    res.status(201).json({ message: "Activity created successfully", activity: newActivity });
  } catch (error) {
    if (error.code === 11000) {  // 11000 is the MongoDB error code for duplicate keys
      res.status(400).json({ message: "An activity with this name already exists" });
    } else {
      console.error("Error creating activity:", error);
      res.status(400).json({ message: "Failed to create activity" });
    }
  }
};
const updateActivity = async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const advertiserId = req.user._id;

    // Find the activity and populate the advertiser field
    const activity = await activityModel
      .findById(activityId)
      .populate("advertiser");

    // Check if the activity exists
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Verify if the current user is authorized to edit the activity
    if (activity.advertiser._id.toString() !== advertiserId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit others' activities" });
    }
    const today = new Date();
    today.setHours(0, 0, 0);
    const activityDate = activity.date.setHours(0, 0, 0);

    if (today > activityDate) return res.status(400).json({ message: 'this activity is old you are not allowed to edit it' })
    // Extract fields from the request body
    const {
      name,
      date,
      time,
      location,
      price,
      category,
      tags,
      discounts,
      bookingAvailable,
      rating,
    } = req.body;
    const query = {};

    // Update tags if provided
    if (tags) {
      const tagDocs = await preferenceTagModel.find({ _id: { $in: tags } });
      if (tagDocs.length !== tags.length) {
        throw Error("Some preference tags are invalid");
      }
      query.tags = tags; // Using IDs directly
    }

    // Update category if provided
    if (category) {
      const categoryDoc = await categoryModel.findById(category);
      if (!categoryDoc) {
        throw Error("Invalid category selected");
      }
      query.category = category; // Using ID directly
    }

    // Validate and update date
    if (date) {
      const currentDate = new Date();
      const activityDate = new Date(date);
      if (activityDate < currentDate) {
        throw Error("Please enter a future date");
      }
      query.date = date;
    }

    // Update remaining fields if provided
    if (name) query.name = name;
    if (location) query.location = location;
    if (price) query.price = price;
    if (time) query.time = time;
    if (discounts) query.discounts = discounts;
    if (rating) query.rating = rating;
    if (bookingAvailable !== undefined) query.bookingAvailable = bookingAvailable;

    // Update the activity with the constructed query
    await activityModel.findByIdAndUpdate(activityId, query);

    res.status(200).json({
      message: "Activity updated successfully",
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(400).json({ message: e.message });
  }
};
const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.activityid.trim();
    const advertiserId = req.user._id;

    // Find the activity
    const activity = await activityModel.findById(activityId).populate("advertiser");

    // Check if activity exists
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Check if the advertiserId matches the one in the activity
    if (activity.advertiser && activity.advertiser._id.toString() !== advertiserId) {
      return res.status(403).json({ message: "You are not authorized to delete this activity" });
    }
    const activityTickets = await activityTicketModel.find({ activity: activityId, status: 'active' })

    const today = new Date();
    today.setHours(0, 0, 0);
    const activityDate = new Date(activity.date)
    activityDate.setHours(0, 0, 0)

    if (today < activityDate && activityTickets.length > 0) return res.status(400).json({ message: 'this activity is booked from other users you are not allowed to delete it' })

    // Delete the activity if checks pass
    await activityModel.findByIdAndDelete(activityId);
    res.status(200).json({ message: "Activity deleted successfully" });

  } catch (err) {
    console.error("Error deleting activity:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const getMyActivities = async (req, res) => {
  try {
    const advertiserId = req.user._id;
    const activities = await activityModel
      .find({ advertiser: advertiserId })
      .populate({
        path: "category",
        select: "name description -_id" // Select only the necessary fields and exclude '_id'
      })
      .populate({
        path: "tags",
        select: "name description -_id" // Select only the necessary fields and exclude '_id'
      })
      .select("name date time location price discounts bookingAvailable rating _id") // Include '_id' for the activity
      .sort({ createdAt: 1 }); // Sort by creation date in ascending order

    if (activities.length === 0) {
      return res.status(404).json({ message: "No activities found for this advertiser" });
    } else {
      return res.status(200).json(activities);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get activities", error: err.message });
  }
};
const uploadLogo = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: 'Logo is required' });
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

    await advertiserModel.findOneAndUpdate({ user: req.user._id }, { logo: imageUrl });

    res.status(200).json({
      message: 'Logo uploaded successfully',
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error uploading logo', error: error.message });


  }
}
const createTransportation = async (req, res) => {
  try {
    const { name, time, date, type, pickupLocation, dropOffLocation, price } = req.body;

    // Validate required fields
    if (!name || !time || !date || !type || !pickupLocation || !dropOffLocation || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await transportationModel.findOne({ name });
    if (exists) return res.status(400).json({ message: 'this name already exists' })
    // Create a new transportation entry
    const newTransportation = new transportationModel({
      advertiser: req.user._id,
      name,
      time,
      date,
      type,
      price,
      pickupLocation: pickupLocation,
      dropOffLocation: dropOffLocation
    });

    // Save to the database
    await newTransportation.save();

    res.status(201).json({
      message: "Transportation created successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create transportation",
      error: error.message
    });
  }
};
const getAllTransportation = async (req, res) => {
  try {
    const transportations = await transportationModel.find().populate('advertiser', 'username');
    if (!transportations || transportations.length == 0)
      return res.status(400).json({ message: 'no transportation created yet' });


    return res.status(200).json({ message: 'transportations retrieved successfully', transportations })

  }
  catch (error) {
    return res.status(400).json({ message: 'can\'t retrieve transportation', error: error.message })
  }
}
const deleteTransportation = async (req, res) => {
  try {
    const transportationIdString = req.body.transportationId;

    if (!transportationIdString) {
      return res.status(400).json({ message: 'Please choose a transportation to delete' });
    }

    const transportationId = new mongoose.Types.ObjectId(transportationIdString);

    const transportation = await transportationModel.findById(transportationId);

    if (!transportation) {
      return res.status(404).json({ message: 'Transportation not found' });
    }

    if (req.user._id.toString() !== transportation.advertiser.toString()) return res.status(403).json({ message: 'sorry you dont have the authority to delete this transportation' })
    if (transportation.touristsBooked.length > 0) return res.status(400).json({ message: 'transportation is booked by tourists can\'t delete it' })
    await transportationModel.findByIdAndDelete(transportationId);
    return res.status(200).json({ message: 'Deleted transportation successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Error deleting transportation', error: error.message });
  }
};
const editTransportation = async (req, res) => {
  try {
    const transportationIdString = req.body.transportationId;

    if (!transportationIdString) {
      return res.status(400).json({ message: 'Please choose a transportation to edit' });
    }

    const transportationId = new mongoose.Types.ObjectId(transportationIdString);

    // Find the transportation by ID
    const transportation = await transportationModel.findById(transportationId);

    if (!transportation) {
      return res.status(404).json({ message: 'Transportation not found' });
    }

    // Check if the user is the advertiser
    if (req.user._id.toString() !== transportation.advertiser.toString()) {
      return res.status(403).json({ message: 'Sorry, you do not have the authority to edit this transportation' });
    }

    // Check if the transportation is booked by tourists
    if (transportation.touristsBooked.length > 0) {
      return res.status(400).json({ message: 'Transportation is booked by tourists and cannot be edited' });
    }

    // Define the fields that can be updated
    const { name, dropOffLocation, pickupLocation, time, type, cost } = req.body;

    // Update only the allowed fields if they are provided
    if (name) transportation.name = name;
    if (dropOffLocation) transportation.dropOffLocation = dropOffLocation;
    if (pickupLocation) transportation.pickupLocation = pickupLocation;
    if (time) transportation.time = time;
    if (type) transportation.type = type;
    if (cost) transportation.cost = cost;

    // Save the updated transportation document
    await transportation.save();

    return res.status(200).json({ message: 'Transportation updated successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Error updating transportation', error: error.message });
  }
};
const getMyTransportations = async (req, res) => {
  try {
    // Find all transportation records where the user is the advertiser
    const transportations = await transportationModel.find({ advertiser: req.user._id });

    // Check if the user has any transportations
    if (transportations.length === 0) {
      return res.status(404).json({ message: 'No transportations found for this user.' });
    }

    return res.status(200).json({ transportations });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching transportations', error: error.message });
  }
};


const viewRevenue = async (req, res) => {
  try {
    const tickets = await activityTicketModel.find({ status: 'active' });
    if (tickets.length === 0) throw Error('You have no revenues yet');

    const myActivities = await Promise.all(
      tickets.map(async t => {
        const activity = await activityModel.findById(t.activity);
        if (activity.advertiser.toString() === req.user._id.toString()) {
          return t;
        }
        return null;
      })
    );

    const validActivities = myActivities.filter(t => t !== null);

    let totalRevenue = 0;

    for (const activity of validActivities) {
      const receipt = await receiptModel.findById(activity.receipt);
      if (receipt && receipt.status === 'successful') {
        totalRevenue += receipt.price;
      }
    }

    return res.status(200).json({ totalRevenue });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  uploadLogo,
  upload,
  createTransportation,
  getAllTransportation,
  deleteTransportation,
  editTransportation,
  getMyTransportations,
  viewRevenue
};
