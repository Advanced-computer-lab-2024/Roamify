const userModel = require("../models/userModel");
const activityModel = require("../models/activityModel");
const itineraryModel = require("../models/itineraryModel");
const touristModel = require("../models/touristModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const sellerModel = require("../models/sellerModel");
const activityTicketModel = require("../models/activityTicketModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const transportationModel = require("../models/transportationModel");
const productModel = require("../models/productModel");
const walletModel = require("../models/walletModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary config
const multer = require("multer");
const storage = multer.memoryStorage();
const mongoose = require('mongoose')
const upload = multer({ storage }).fields([
  { name: "ID", maxCount: 1 }, // Field for YourGuide ID
  { name: "additionalDocument", maxCount: 1 }, // Field for Certificate
]);







const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "3d" });
};
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure cookies in production
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration
  });
};
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

    if (status !== "active") {
      const token = createToken(_id, role);
      setTokenCookie(res, token);
      return res.status(200).json({
        username: user.username,
        status,
        role,
        idDocument: user.idDocument.url,
        additionalDocument: user.additionalDocument.url,
        termsAndConditions: user.termsAndConditions,
      });
    }
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
        status,
        idDocument: user.idDocument.url,
        additionalDocument: user.additionalDocument.url,
        termsAndConditions: user.termsAndConditions,
      });
    }

    // Handle advertiser, seller, tour guide login
    if (["advertiser", "seller", "tourGuide"].includes(role)) {
      let model, entity;
      if (role === "advertiser") model = advertiserModel;
      if (role === "seller") model = sellerModel;
      if (role === "tourGuide") model = tourGuideModel;

      // Check for the specific profile unless status is "pending profile"
      entity =
        status !== "pending creation"
          ? await model.findOne({ user: _id })
          : null;
      if (!entity && status !== "pending creation") {
        return res.status(404).json({ message: `${role} profile not found` });
      }

      const token = createToken(_id, role);
      setTokenCookie(res, token);

      return res.status(200).json({
        email: user.email,
        username: user.username,
        role: user.role,
        status,
        idDocument: user.idDocument.url,
        additionalDocument: user.additionalDocument.url,
        termsAndConditions: user.termsAndConditions,
      });
    }

    // General token for other users (tourismGovernor, admin, etc.)
    const token = createToken(_id, role);
    setTokenCookie(res, token);

    return res.status(200).json({
      username: user.username,
      role: user.role,
      status,
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

    if (!oldPassword)
      return res
        .status(400)
        .json({ message: "Please enter your old password" });
    if (!newPassword1 || !newPassword2)
      return res
        .status(400)
        .json({ message: "Please enter your new password and confirm it" });

    if (newPassword1 !== newPassword2)
      return res.status(400).json({ message: "New passwords do not match" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Old password is incorrect" });

    if (!validator.isStrongPassword(newPassword1))
      return res.status(400).json({
        message: "Password does not meet minimum strength requirements",
      });

    const oldMatchNew = await bcrypt.compare(newPassword1, user.password);
    if (oldMatchNew)
      return res
        .status(400)
        .json({ message: "New password should be different from the old one" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword1, salt);

    await userModel.findByIdAndUpdate(req.user._id, {
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldn't change password", error: error.message });
  }
};
const uploadRequiredDocuments = async (req, res) => {
  try {
    // Helper function to upload a file to Cloudinary and return its secure URL and public ID
    const uploadToCloudinary = (fileBuffer, publicId) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "requestsDocuments",
              public_id: publicId,
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve({ url: result.secure_url, public_id: result.public_id });
            }
          )
          .end(fileBuffer);
      });
    };

    // Check if any files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message:
          "No files were uploaded. Please upload the required documents.",
      });
    }

    // Check for specific required documents
    if (!req.files["ID"]) {
      return res
        .status(400)
        .json({ message: "ID document is required. Please upload your ID." });
    }

    if (!req.files["additionalDocument"]) {
      const message =
        req.user.role === "tourGuide"
          ? "Certificate document is required. Please upload your certificate."
          : "Taxation registry document is required. Please upload your taxation registry.";
      return res.status(400).json({ message });
    }

    // Upload ID and additional document
    const ID = await uploadToCloudinary(
      req.files["ID"][0].buffer,
      `${req.user._id}ID`
    );
    const secondDocument = await uploadToCloudinary(
      req.files["additionalDocument"][0].buffer,
      `${req.user._id}AdditionalDocuments`
    );

    // Save URLs and public IDs in the database
    await userModel.findByIdAndUpdate(req.user._id, {
      idDocument: {
        url: ID.url,
        public_id: ID.public_id,
      },
      additionalDocument: {
        url: secondDocument.url,
        public_id: secondDocument.public_id,
      },
    });

    res.status(200).json({
      message: "Documents uploaded successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading documents", error: error.message });
  }
};
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1, // Immediately expire
  });
  return res.status(200).json({ message: "Successfully logged out" });
};
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
    if (user.status === "pending")
      throw Error(
        "please wait for admin to view yur documents before you proceed"
      );
    if (user.status === "rejected")
      throw Error("you don't have the privilege to do this action");
    const accepted = req.body.accepted;
    if (accepted === null || accepted === "")
      throw Error("please accept or reject our terms and");
    if (accepted) {
      await userModel.findByIdAndUpdate(userId, { termsAndConditions: true });
      return res
        .status(200)
        .json({ message: "accepted terms and conditions successfully" });
    } else {
      await userModel.findByIdAndUpdate(userId, { termsAndConditions: false });
      return res.status(200).json({ message: "rejected terms and conditions" });
    }
  } catch (error) {
    res.status(400).json({
      message: "couldn't accept or reject terms and conditions",
      error: error.message,
    });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);


    const role = user.role;

    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start a transaction

    if (role === "advertiser") {
      let activityTickets = await activityTicketModel
        .find({ status: "active" })
        .populate({
          path: "activity",
          match: { advertiser: req.user._id }, // Filter by advertiser
        });
      console.log(activityTickets)
      activityTickets = activityTickets.filter(t => t.date >= new Date())

      if (activityTickets.length > 0) return res.status(400).json({
        message:
          "Can't delete your account; some activities are booked already. Try again later.",
      });

      const transportation = await transportationModel.find({
        advertiser: req.user._id,
        date: { $gt: new Date() },
        $expr: { $gt: [{ $size: "$touristsBooked" }, 0] },
      });

      if (transportation.length > 0)
        return res.status(400).json({
          message:
            "Can't delete your account; some transportations are booked already. Try again later.",
        });


      await activityModel.deleteMany({ advertiser: req.user._id }, { session });
      await advertiserModel.findOneAndDelete({ user: req.user._id }, { session });
      await userModel.findByIdAndDelete(req.user._id, { session });

    } else if (role === "seller") {

      await productModel.deleteMany({ sellerId: req.user._id }, { session });
      await sellerModel.deleteMany({ user: req.user._id }, { session });
      await userModel.findByIdAndDelete(req.user._id, { session });

    } else if (role === "tourGuide") {
      let itineraryTickets = await itineraryTicketModel
        .find({ status: "active" })
        .populate({
          path: "itinerary",
          match: { tourGuide: req.user._id },
        });

      itineraryTickets = itineraryTickets.filter(
        (ticket) => ticket.date >= new Date()
      );

      console.log(itineraryTickets)

      if (itineraryTickets.length > 0)
        return res.status(400).json({
          message:
            "Can't delete your account; some itineraies are booked already. Try again later.",
        });

      await itineraryModel.deleteMany({ tourGuide: req.user._id }, { session });
      await tourGuideModel.findOneAndDelete({ user: req.user._id }, { session });
      await userModel.findByIdAndDelete(req.user._id, { session });

    } else {
      const activityTickets = await activityTicketModel
        .find({ tourist: req.user._id, status: "active", date: { $gt: new Date() } })
      if (activityTickets.length > 0) return res.status(400).json({
        message:
          "Can't delete your account; some activities are booked already. Try again later.",
      });

      let itineraryTickets = await itineraryTicketModel.find({
        tourist: req.user._id,
        status: "active",
        date: { $gt: new Date() }
      });
      if (itineraryTickets.length > 0)
        return res.status(400).json({
          message:
            "Can't delete your account; some itineraries are booked already. Try again later.",
        });

      const transportation = await transportationModel.find({
        touristsBooked: { $elemMatch: { $eq: req.user._id } }
      });

      if (transportation.length > 0)
        return res.status(400).json({
          message:
            "Can't delete your account; some transportations are booked already. Try again later.",
        });




      await activityTicketModel.deleteMany({ tourist: req.user._id }, { session });
      await itineraryTicketModel.deleteMany({ tourist: req.user._id }, { session });
      await touristModel.deleteOne({ user: req.user._id }, { session });
      await walletModel.deleteOne({ tourist: req.user._id })
      await userModel.findByIdAndDelete(req.user._id, { session });

    }
    await session.commitTransaction();
    session.endSession();
    res.clearCookie("token"); // Assuming your JWT is stored in a cookie named 'token'
    return res.status(200).json({ message: "deleted user successfully" });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error could not delete account",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUsersByRole,
  changePassword,
  uploadRequiredDocuments,
  termsAndConditions,
  deleteAccount,
  upload,
};
