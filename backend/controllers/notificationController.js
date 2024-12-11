const { default: mongoose } = require("mongoose");
const notificationModel = require("../models/notificationModel");

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({ user: req.user._id })
      .select("type message read _id")
      .sort({ read: 1, createdAt: -1 });

    if (!notifications.length) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.status(200).json({
      message: "Notifications retrieved successfully.",
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve notifications.",
      error: error.message,
    });
  }
};
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    if (!notificationId) {
      return res
        .status(400)
        .json({ message: "Please provide a notification ID to mark as read." });
    }

    const nId = new mongoose.Types.ObjectId(notificationId);
    const notification = await notificationModel.findById(nId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to modify this notification.",
      });
    }

    if (notification.read) {
      return res.status(400).json({
        message: "Notification is already marked as read.",
      });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark notification as read.",
      error: error.message,
    });
  }
};

module.exports = { getNotifications, markAsRead };
