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
const nodemailer = require("nodemailer");
const emailTemplates = require("../emailTemplate");
const { default: mongoose } = require("mongoose");
const { connectedUsers } = require("../config/socket");

async function notifyUser(io, userId, type, name) {
  try {
    const message =
        type === "activity"
            ? `Your activity "${name}" has been flagged as inappropriate by the admin.`
            : `Your itinerary "${name}" has been flagged as inappropriate by the admin.`;

    const notification = new notificationModel({
      user: userId,
      type: `flagged-${type}`,
      message,
    });
    await notification.save();

    const socketId = connectedUsers[userId.toString()];
    if (socketId) {
      io.to(socketId).emit("receiveNotification", message);
      console.log(`Notification sent to user ${userId}: ${message}`);
    } else {
      console.log(`User ${userId} is not connected.`);
    }
  } catch (error) {
    console.error("Failed to notify user:", error.message);
  }
}
const addTourismGovernor = async (req, res) => {
  const { username, password } = req.body;

  try {
    const governorExistsByUsername = await userModel.findOne({ username });
    if (governorExistsByUsername) {
      return res.status(400).json({ message: "Username already exists." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password does not meet the minimum security requirements.",
      });
    }

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newGovernor = new userModel({
      username,
      password: hashedPassword,
      email,
      role: "tourismGovernor",
      status: "active",
    });

    await newGovernor.save();

    res.status(201).json({
      message: "New Tourism Governor created successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "An unexpected error occurred while creating the Tourism Governor.",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    switch (user.role) {
      case "tourist":
        await Promise.all([
          touristModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res.status(200).json({ message: "Tourist deleted successfully." });

      case "seller":
        await Promise.all([
          sellerModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res.status(200).json({ message: "Seller deleted successfully." });

      case "advertiser":
        await Promise.all([
          advertiserModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res
            .status(200)
            .json({ message: "Advertiser deleted successfully." });

      case "tourGuide":
        await Promise.all([
          tourGuideModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res
            .status(200)
            .json({ message: "Tour Guide deleted successfully." });

      case "tourismGovernor":
        await userModel.findByIdAndDelete(userId);
        return res
            .status(200)
            .json({ message: "Tourism Governor deleted successfully." });

      default:
        return res
            .status(400)
            .json({ message: "Invalid role, unable to delete user." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An unexpected error occurred while deleting the user.",
      error: error.message,
    });
  }
};
const addAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await userModel.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password does not meet the minimum security requirements.",
      });
    }

    const lastAdmin = await userModel
        .findOne({ role: "admin" })
        .sort({ createdAt: -1 });
    let nextAdminNumber = 1;

    if (lastAdmin) {
      const match = lastAdmin.email.match(/admin(\d+)@roamify\.com/);
      if (match) {
        nextAdminNumber = parseInt(match[1]) + 1;
      }
    }

    const email = `admin${nextAdminNumber}@roamify.com`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new userModel({
      username,
      email,
      password: hashedPassword,
      status: "active",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "New admin created successfully.",
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: "An unexpected error occurred while creating the admin.",
      error: error.message,
    });
  }
};
const viewUploadedDocuments = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const id = new mongoose.Types.ObjectId(userId);

    const userUrls = await userModel
        .findById(id)
        .select("idDocument additionalDocument");

    if (!userUrls) {
      return res.status(404).json({ message: "User documents not found." });
    }

    res.status(200).json({
      message: "Documents retrieved successfully.",
      IDs: userUrls.idDocument.url,
      additionalDocuments: userUrls.additionalDocument.url,
    });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred while fetching the documents.",
      error: e.message,
    });
  }
};
const acceptRejectUser = async (req, res) => {
  try {
    const { userIdString, approved } = req.body;

    if (!userIdString) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (approved === null || approved === "") {
      return res.status(400).json({ message: "Please specify approval or rejection." });
    }

    const userId = new mongoose.Types.ObjectId(userIdString);
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.status !== "pending") {
      return res.status(400).json({
        message: "Approval or rejection has already been processed for this user.",
      });
    }

    if (approved === "accept") {
      await userModel.findByIdAndUpdate(userId, { status: "pending creation" });
      return res.status(200).json({ message: "User accepted successfully." });
    } else {
      await userModel.findByIdAndUpdate(userId, { status: "rejected" });
      return res.status(200).json({ message: "User rejected successfully." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing the request.",
      error: error.message,
    });
  }
};
const flagItinerary = async (req, res) => {
  try {
    const { itineraryIdString } = req.body;

    if (!itineraryIdString) {
      return res.status(400).json({ message: "Itinerary ID is required." });
    }

    const itineraryId = new mongoose.Types.ObjectId(itineraryIdString);
    const updatedItinerary = await itineraryModel.findByIdAndUpdate(
        itineraryId,
        { flag: true },
        { returnDocument: "after" }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    const user = await userModel.findById(updatedItinerary.tourGuide);

    if (user) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const text = emailTemplates.flaggedItineraryEmail(user.username, updatedItinerary.name);
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Notification Regarding Your Itinerary",
        text,
      };

      await transporter.sendMail(mailOptions);

      const io = req.app.get("io");
      notifyUser(io, user._id, "itinerary", updatedItinerary.name);
    }

    res.status(200).json({
      message: "Itinerary flagged successfully. It is now invisible to tourists and guests.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while flagging the itinerary.",
      error: error.message,
    });
  }
};
const unflagItinerary = async (req, res) => {
  try {
    const { itineraryIdString } = req.body;

    if (!itineraryIdString) {
      return res.status(400).json({ message: "Itinerary ID is required." });
    }

    const itineraryId = new mongoose.Types.ObjectId(itineraryIdString);
    const updatedItinerary = await itineraryModel.findByIdAndUpdate(itineraryId, { flag: false });

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    res.status(200).json({
      message: "Itinerary unflagged successfully. It is now visible to tourists and guests.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while unflagging the itinerary.",
      error: error.message,
    });
  }
};
const flagActivity = async (req, res) => {
  try {
    const { activityIdString } = req.body;

    if (!activityIdString) {
      return res.status(400).json({ message: "Activity ID is required." });
    }

    const activityId = new mongoose.Types.ObjectId(activityIdString);
    const activity = await activityModel.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    if (activity.flag) {
      return res.status(400).json({ message: "Activity is already flagged." });
    }

    const updatedActivity = await activityModel.findByIdAndUpdate(
        activityId,
        { flag: true },
        { returnDocument: "after" }
    );

    const user = await userModel.findById(updatedActivity.advertiser);

    if (user) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const text = emailTemplates.flaggedActivityEmail(user.username, updatedActivity.name);
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Notification Regarding Your Activity",
        text,
      };

      await transporter.sendMail(mailOptions);

      const io = req.app.get("io");
      notifyUser(io, user._id, "activity", updatedActivity.name);
    }

    res.status(200).json({
      message: "Activity flagged successfully. It is now invisible to tourists and guests.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while flagging the activity.",
      error: error.message,
    });
  }
};
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await userModel
        .find({ status: "pending" })
        .select("username _id email role");

    if (!pendingUsers || pendingUsers.length === 0) {
      return res.status(404).json({ message: "No pending users found." });
    }

    res.status(200).json({
      message: "Pending users retrieved successfully.",
      pendingUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching pending users.",
      error: error.message,
    });
  }
};
const getTotalUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      status: "active",
      role: { $ne: "admin" },
    });

    const map = new Map();

    for (const user of users) {
      const month = new Date(user.createdAt).getMonth() + 1;
      const entry = map.get(month);
      if (!entry) {
        map.set(month, { count: 1 });
      } else {
        map.set(month, { count: entry.count + 1 });
      }
    }

    const result = Array.from(map, ([name, data]) => ({
      month: name,
      count: data.count,
    }));

    if (result.length === 0) {
      return res.status(404).json({ message: "No active users found." });
    }

    res.status(200).json({
      message: "Total users retrieved successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching total users.",
      error: error.message,
    });
  }
};

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
  getTotalUsers,
};
