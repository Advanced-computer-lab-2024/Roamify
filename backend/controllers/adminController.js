const touristModel = require("../models/touristModel");
const itineraryModel = require("../models/itineraryModel");
const activityModel = require("../models/activityModel");
const userModel = require("../models/userModel");
const sellerModel = require("../models/sellerModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const notificationModel = require("../models/notificationModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const emailTemplates = require('../emailTemplate');
const { default: mongoose } = require("mongoose");
const { connectedUsers } = require('../config/socket')

async function notifyUser(io, userId, type, name) {

  const message = type === 'activity' ? `Your activity "${name}" has been flagged as inappropriate by the admin.` : `Your itinerary "${name}" has been flagged as inappropriate by the admin.`;
  const notification = new notificationModel({
    user: userId,
    type: `flagged-${type}`,
    message
  });
  await notification.save();


  const socketId = connectedUsers[userId.toString()];
  if (socketId) {
    io.to(socketId).emit("receiveNotification", message); // Send the message
    console.log(`Notification sent to user ${userId}: ${message}`);
  }
  else {
    console.log(`User ${userId} is not connected.`);
  }


}
const addTourismGovernor = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const governorExistsByUsername = await userModel.findOne({ username });
    if (governorExistsByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Password doesn't meet minimum requirements" });
    }

    // Generate a unique email
    const lastGovernor = await userModel
      .findOne({ role: "tourismGovernor" })
      .sort({ createdAt: -1 });
    let nextGovernorNumber = 1;

    if (lastGovernor) {
      const match = lastGovernor.email.match(/governor(\d+)@roamify\.com/);
      if (match) {
        nextGovernorNumber = parseInt(match[1]) + 1;
      }
    }

    const email = `governor${nextGovernorNumber}@roamify.com`;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new Tourism Governor user
    const newGovernor = new userModel({
      username,
      password: hashedPassword,
      email,
      role: "tourismGovernor",
      status: "active",
    });

    await newGovernor.save();

    res.status(201).json({
      message: "New Tourism Governor created successfully",
      email: newGovernor.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user by ID to confirm existence and role
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let deletionResult;
    switch (user.role) {
      case "tourist":
        deletionResult = await Promise.all([
          touristModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res
          .status(200)
          .json({ message: "Tourist deleted successfully" });

      case "seller":
        deletionResult = await Promise.all([
          sellerModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res.status(200).json({ message: "Seller deleted successfully" });

      case "advertiser":
        deletionResult = await Promise.all([
          advertiserModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res
          .status(200)
          .json({ message: "Advertiser deleted successfully" });

      case "tourGuide":
        deletionResult = await Promise.all([
          tourGuideModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res
          .status(200)
          .json({ message: "Tour Guide deleted successfully" });

      case "tourismGovernor":
        await userModel.findByIdAndDelete(userId);
        return res
          .status(200)
          .json({ message: "Tourism Governor deleted successfully" });

      default:
        return res
          .status(400)
          .json({ message: "Invalid role, unable to delete user" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
const addAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {

    // Check if the admin username already exists
    const userExists = await userModel.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Password doesn't meet minimum requirements" });
    }

    // Find the last created admin and determine the next number for email
    const lastAdmin = await userModel
      .findOne({ role: "admin" })
      .sort({ createdAt: -1 });
    let nextAdminNumber = 1; // Default to 1 if no admin exists

    if (lastAdmin) {
      // Extract the number from the previous admin's email, if it exists
      const match = lastAdmin.email.match(/admin(\d+)@roamify\.com/);
      if (match) {
        nextAdminNumber = parseInt(match[1]) + 1;
      }
    }

    // Generate the new admin email
    const email = `admin${nextAdminNumber}@roamify.com`;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new admin user
    const newAdmin = new userModel({
      username,
      email,
      password: hashedPassword,
      status: "active",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "New admin created successfully",
      email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const viewUploadedDocuments = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId)
      return res.status(400).json({ message: "please choose a user" });

    const id = new mongoose.Types.ObjectId(userId);

    const userUrls = await userModel
      .findById(id)
      .select("idDocument additionalDocument");

    res.status(200).json({
      IDs: userUrls.idDocument.url,
      additionalDocuments: userUrls.additionalDocument.url,
    });
  } catch (e) {
    res
      .status(400)
      .json({ message: "couldn't get document", error: e.message });
  }
};
const acceptRejectUser = async (req, res) => {
  try {
    const { userIdString, approved } = req.body;

    if (!userIdString) {
      return res.status(400).json({ message: "select a user" });
    }
    if (approved === null || approved === "")
      throw Error("please accept or reject");

    const userId = new mongoose.Types.ObjectId(userIdString);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status !== "pending")
      throw Error("we have responded our approval/disapproval for this user");

    if (approved === "accept") {
      await userModel.findByIdAndUpdate(userId, { status: "pending creation" });
      return res.status(200).json({ message: "Accepted user successfully" });
    } else {
      await userModel.findByIdAndUpdate(userId, { status: "rejected" });
      return res
        .status(200)
        .json({ message: "Rejected and user successfully" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Couldn't accept or reject user",
      error: error.message,
    });
  }
};
const flagItinerary = async (req, res) => {
  try {
    const { itineraryIdString } = req.body;
    if (!itineraryIdString) throw Error("Please choose an itinerary to unflag");

    const itineraryId = new mongoose.Types.ObjectId(itineraryIdString);

    const updatedItinerary = await itineraryModel.findByIdAndUpdate(
      itineraryId,
      { flag: true },
      { returnDocument: "after" } // Use { new: true } if your Mongoose version is older
    );

    const user = await userModel.findById(updatedItinerary.tourGuide)

    const email = user.email

    const username = user.username

    const itineraryName = updatedItinerary.name

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const text = emailTemplates.flaggedItineraryEmail(username, itineraryName);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Notification Regarding Your Itinerary",
      text
    };

    await transporter.sendMail(mailOptions);
    notifyUser(user._id, 'itinerary', itineraryName);


    return res.status(200).json({
      message: "Itinerary flagged. It is now invisible to tourists and guests.",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't flag itinerary",
      error: error.message,
    });
  }
};
const unflagItinerary = async (req, res) => {
  try {
    const { itineraryIdString } = req.body;
    if (!itineraryIdString) throw Error("Please choose an itinerary to unflag");

    const itineraryId = new mongoose.Types.ObjectId(itineraryIdString);

    await itineraryModel.findByIdAndUpdate(itineraryId, { flag: false });

    return res.status(200).json({
      message: "Itinerary unflagged. It is now visible to tourists and guests.",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't unflag itinerary",
      error: error.message,
    });
  }
};
const flagActivity = async (req, res) => {
  try {
    const { activityIdString } = req.body;
    if (!activityIdString) throw Error("Please choose an activity to unflag");

    const activityId = new mongoose.Types.ObjectId(activityIdString);

    const activity = await activityModel.findById(activityId);
    if (activity.flag) throw Error('activity is already flagged')
    const updatedActivity = await activityModel.findByIdAndUpdate(
      activityId,
      { flag: true },
      { returnDocument: "after" } // Use { new: true } if your Mongoose version is older
    );

    const user = await userModel.findById(updatedActivity.advertiser)

    const email = user.email

    const username = user.username

    const activityName = updatedActivity.name

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const text = emailTemplates.flaggedActivityEmail(username, activityName);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Notification Regarding Your Activity",
      text
    };

    await transporter.sendMail(mailOptions);

    const io = req.app.get("io"); // Access io from app
    notifyUser(io, user._id, 'activity', activityName);
    return res.status(200).json({
      message: "Activity flagged. It is now invisible to tourists and guests.",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await userModel
      .find({ status: "pending" })
      .select("username _id email role");
    if (!pendingUsers || pendingUsers.length === 0)
      return res.status(400).json({ message: "no pending users" });

    return res.status(200).json({ pendingUsers });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetching pending users",
      error: error.message,
    });
  }
};
const getTotalUsers = async (req, res) => {
  try {



    let users = await userModel.find({
      status: 'active',
      role: { $ne: 'admin' }
    });

    const map = new Map();

    for (user of users) {
      const month = new Date(user.createdAt).getMonth() + 1;
      const entry = map.get(month);
      if (!entry) {
        map.set(month, { count: 1 });
      }
      else {
        map.set(month, { count: entry.count + 1 })
      }
    }
    const result = Array.from(map, ([name, data]) => {
      return { month: name, count: data.count }; // Transform into an object
    });
    if (result === 0) throw new Error('There are no current users');
    return res.status(200).json(result)

  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addTourismGovernor,
  deleteUser,
  addAdmin,
  viewUploadedDocuments,
  acceptRejectUser,
  flagItinerary,
  unflagItinerary,
  getPendingUsers,
  flagActivity,
  getTotalUsers
};
