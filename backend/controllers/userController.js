const userModel = require("../models/userModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const touristModel = require("../models/touristModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const sellerModel = require("../models/sellerModel");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require("validator");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'ID', maxCount: 1 }, // Field for YourGuide ID
  { name: 'additionalDocument', maxCount: 1 }  // Field for Certificate
]);

// Create JWT Token
const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
}
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure cookies in production
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration
  });
};

// Adjusted Create User Function
// Adjusted Create User Function
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate role to ensure it's not "admin" or "tourismGovernor"
    if (role === "admin" || role === "tourismGovernor") {
      return res.status(403).json({ error: "Invalid role selection" });
    }

    // Creating the user
    const user = await userModel.signUp(username, email, password, role);

    // Create a token
    const token = createToken(user._id, user.role);

    // Set the token in an HttpOnly cookie
    setTokenCookie(res, token);

    // Return user info without the token in the response
    res.status(201).json({
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { role, status, _id } = user;

    // Handle tourist login
    if (role === "tourist") {
      const tourist = await touristModel.findOne({ user: _id });
      if (!tourist && status !== "pending profile") {
        return res.status(404).json({ message: "Tourist profile not found" });
      }

      const token = createToken(_id, role);
      setTokenCookie(res, token);

      return res.status(200).json({
        email: user.email,
        username: user.username,
        role: user.role,
      });
    }

    // Handle advertiser, seller, tour guide login
    if (["advertiser", "seller", "tourGuide"].includes(role)) {
      if (status === "pending") {
        return res.status(403).json({ message: "Your account is pending approval by an admin." });
      }

      let model, entity;
      if (role === "advertiser") model = advertiserModel;
      if (role === "seller") model = sellerModel;
      if (role === "tourGuide") model = tourGuideModel;

      // Check for the specific profile unless status is "pending profile"
      entity = status !== "pending creation" ? await model.findOne({ user: _id }) : null;
      if (!entity && status !== "pending creation") {
        return res.status(404).json({ message: `${role} profile not found` });
      }

      const token = createToken(_id, role);
      setTokenCookie(res, token);

      return res.status(200).json({
        email: user.email,
        username: user.username,
        role: user.role,
      });
    }

    // Handle general login for other users, including status check
    if (status === "pending") {
      return res.status(403).json({ message: "Your account is pending approval by an admin." });
    }

    // General token for other users (tourismGovernor, admin, etc.)
    const token = createToken(_id, role);
    setTokenCookie(res, token);

    return res.status(200).json({
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { oldPassword, newPassword1, newPassword2 } = req.body;

    if (!oldPassword) return res.status(400).json({ message: "Please enter your old password" });
    if (!newPassword1 || !newPassword2) return res.status(400).json({ message: "Please enter your new password and confirm it" });

    if (newPassword1 !== newPassword2) return res.status(400).json({ message: "New passwords do not match" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Old password is incorrect" });

    if (!validator.isStrongPassword(newPassword1)) return res.status(400).json({ message: "Password does not meet minimum strength requirements" });

    const oldMatchNew = await bcrypt.compare(newPassword1, user.password);
    if (oldMatchNew) return res.status(400).json({ message: "New password should be different from the old one" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword1, salt);

    await userModel.findByIdAndUpdate(req.user._id, { password: hashedPassword });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Couldn't change password", error: error.message });
  }
};

const uploadRequiredDocuments = async (req, res) => {
  try {
    // Helper function to upload a file to Cloudinary and return its secure URL and public ID
    const uploadToCloudinary = (fileBuffer, publicId) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'requestsDocuments', public_id: publicId, resource_type: 'auto' },
          (error, result) => {
            if (error) return reject(error);
            resolve({ url: result.secure_url, public_id: result.public_id });
          }
        ).end(fileBuffer);
      });
    };

    // Check if any files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded. Please upload the required documents.' });
    }

    // Check for specific required documents
    if (!req.files['ID']) {
      return res.status(400).json({ message: 'ID document is required. Please upload your ID.' });
    }

    if (!req.files['additionalDocument']) {
      const message = req.user.role === 'tourGuide'
        ? 'Certificate document is required. Please upload your certificate.'
        : 'Taxation registry document is required. Please upload your taxation registry.';
      return res.status(400).json({ message });
    }

    // Upload ID and additional document
    const ID = await uploadToCloudinary(req.files['ID'][0].buffer, `${req.user._id}ID`);
    const secondDocument = await uploadToCloudinary(req.files['additionalDocument'][0].buffer, `${req.user._id}AdditionalDocuments`);

    // Save URLs and public IDs in the database
    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        idDocument: {
          url: ID.url,
          public_id: ID.public_id
        },
        additionalDocument: {
          url: secondDocument.url,
          public_id: secondDocument.public_id
        }
      }
    );

    res.status(200).json({
      message: 'Documents uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading documents', error: error.message });
  }
};

// Adjusted Logout Function (clear token cookie)
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1, // Immediately expire
  });
  return res.status(200).json({ message: "Successfully logged out" });
};

// Get users by role
const getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;

    if (
      ![
        "admin",
        "tourist",
        "seller",
        "tourGuide",
        "advertiser",
        "tourismGovernor",
      ].includes(role)
    ) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Fetch users based on the role
    const users = await userModel.find({ role });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found with role ${role}` });
    }

    res.status(200).json({
      message: `Users with role ${role} retrieved successfully`,
      users,
    });
  } catch (error) {
    console.error("Error retrieving users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const termsAndConditions = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (user.status === 'pending')
      throw Error('please wait for admin to view yur documents before you proceed');
    if (user.status === "rejected")
      throw Error('you don\'t have the privilege to do this action');
    const accepted = req.body.accepted;
    if (accepted === null || accepted === "")
      throw Error('please accept or reject our terms and')
    if (accepted) {
      await userModel.findByIdAndUpdate(userId, { termsAndConditions: true });
      return res.status(200).json({ message: 'accepted terms and conditions successfully' });
    }
    else {
      await userModel.findByIdAndUpdate(userId, { termsAndConditions: false });
      return res.status(200).json({ message: 'rejected terms and conditions' });
    }
  }
  catch (error) {
    res.status(400).json({ message: 'couldn\'t accept or reject terms and conditions', error: error.message });
  }
}

const deleteAccount = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user)
      throw Error('user does not exist');
    if (user.status !== "active")
      throw Error('you must activate your account first to be able to delete');
    const role = user.role;

    if (role === "advertiser") {

      const tourists = await touristModel.find().select('bookedActivities');

      const bookedActivities = tourists.flatMap(tourist => tourist.bookedActivities);
      for (const bookedActivity of bookedActivities) {
        const activity = await activityModel.findById(bookedActivity.activity);
        const advertiserId = activity.advertiser;
        if (advertiserId.toString() === req.user._id) {
          return res.status(400).json({
            message: 'Can\'t delete your account; some activities are booked already. Try again later.',
          });
        }
      }

      await activityModel.deleteMany({ advertiser: req.user._id });
      await advertiserModel.findOneAndDelete({ user: req.user._id });
      await userModel.findByIdAndDelete(req.user._id);
      res.clearCookie('token'); // Assuming your JWT is stored in a cookie named 'token'

      return res.status(200).json({
        message: 'Deleted advertiser and their activities successfully.',
      });
    }

    else if (role === "seller") { //didnt apply any checks since seller doesnt have future things unlike advertiser and tourguide
      await productModel.deleteMany({ sellerId: req.user._id });
      await sellerModel.deleteMany({ user: req.user._id });
      await userModel.findByIdAndDelete(req.user._id);
      res.clearCookie('token'); // Assuming your JWT is stored in a cookie named 'token'
      return res.status(200).json({ message: 'deleted seller and his corresponding products successfully' });

    }
    else if (role === "tourGuide") {
      const tourists = await touristModel.find().select('bookedItineraries');
      const bookedItineraries = tourists.flatMap(tourist => tourist.bookedItineraries);
      for (const bookedItinerary of bookedItineraries) {
        const itinerary = await itineraryModel.findById(bookedItinerary.itinerary);
        const tourGuideId = itinerary.tourGuide;
        if (tourGuideId.toString() === req.user._id) {
          return res.status(400).json({
            message: 'Can\'t delete your account; some itineraries are booked already. Try again later.',
          });
        }
      }

      await itineraryModel.deleteMany({ tourGuide: req.user._id });
      await tourGuideModel.findOneAndDelete({ user: req.user._id });
      await userModel.findByIdAndDelete(req.user._id);
      res.clearCookie('token'); // Assuming your JWT is stored in a cookie named 'token'

      return res.status(200).json({
        message: 'Deleted tourGuide and their itineraries successfully.',
      });


    }
    else {
      console.log(1);
      const tourist = await touristModel.findOne({ user: req.user._id }).select('bookedActivities bookedItineraries');
      if (!tourist)
        throw Error('user does not exist');

      if (tourist.bookedActivities.length === 0 && tourist.bookedItineraries.length === 0) {
        await touristModel.deleteOne({ user: req.user._id });
        await userModel.findByIdAndDelete(req.user._id);
        res.clearCookie('token'); // Assuming your JWT is stored in a cookie named 'token'
        return res.status(200).json({ message: 'deleted tourist successfully' });
      }
      else
        return res.status(400).json({ message: 'you still have pending events finish it then delete your account' });

    }

  }
  catch (error) {

    return res.status(400).json({ message: 'error could not delete account', error: error.message })
  }
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUsersByRole,
  changePassword,
  upload,
  uploadRequiredDocuments,
  termsAndConditions,
  deleteAccount
};
