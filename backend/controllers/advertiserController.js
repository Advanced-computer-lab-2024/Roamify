const validator = require("validator");
const nodemailer = require("nodemailer");
const emailTemplate = require("../emailTemplate");
const advertiserModel = require("../models/advertiserModel");
const transportationModel = require("../models/transportationModel");
const userModel = require("../models/userModel");
const activityModel = require("../models/activityModel");
const preferenceTagModel = require("../models/preferenceTagModel");
const categoryModel = require("../models/categoryModel");
const activityTicketModel = require("../models/activityTicketModel");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary config
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const receiptModel = require("../models/receiptModel");
const { connectedUsers } = require("../config/socket");
const touristModel = require("../models/touristModel");
const notificationModel = require("../models/notificationModel");
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).single("logo"); // Accept only 1 file with field name 'profilePicture'

async function notifyUser(io, userId, name) {
  const message = `The activity ${name} is now open for bookings! Secure your spot today and don't miss out!`;
  const notification = new notificationModel({
    user: userId,
    type: `booking available-${name}`,
    message,
  });
  await notification.save();

  const socketId = connectedUsers[userId.toString()];
  if (socketId) {
    io.to(socketId).emit("receiveNotification", message);
    console.log(`Notification sent to user ${userId}`);
  } else {
    console.log(`User ${userId} is not connected.`);
  }
}
const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (user.status === "pending") {
      return res.status(400).json({ message: "Pending admin approval." });
    }

    if (!user.termsAndConditions) {
      return res.status(400).json({
        message: "You must accept the terms and conditions to proceed.",
      });
    }

    const { companyName, websiteLink, hotline, companyProfile } = req.body;

    if (!companyName || !websiteLink || !hotline || !companyProfile) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingProfile = await advertiserModel.findOne({
      user: userId,
      companyName,
    });

    if (existingProfile) {
      return res
          .status(400)
          .json({ message: "A profile for this user already exists." });
    }

    const duplicateCompany = await advertiserModel.findOne({ companyName });
    if (duplicateCompany) {
      return res.status(400).json({
        message: "Company name already exists. Please choose another.",
      });
    }

    await userModel.findByIdAndUpdate(userId, { status: "active" });

    const newAdvertiser = new advertiserModel({
      companyName,
      websiteLink,
      hotline,
      companyProfile,
      user: userId,
    });
    await newAdvertiser.save();

    res.status(201).json({ message: "Advertiser profile created successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create profile.",
      error: error.message,
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;

    const details = await advertiserModel.findOne({ user: id }).populate({
      path: "user",
      select: "username email role password status",
    });

    if (!details) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({
      message: "Profile retrieved successfully.",
      username: details.user.username,
      email: details.user.email,
      role: details.user.role,
      companyName: details.companyName,
      companyProfile: details.companyProfile,
      websiteLink: details.websiteLink,
      hotline: details.hotline,
      logo: details.logo?.url || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve profile.",
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const { companyName, websiteLink, hotline, companyProfile, email } =
        req.body;

    const advertiser = await advertiserModel
        .findOne({ user: id })
        .populate("user");

    if (!advertiser) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const advertiserUpdates = {};
    if (companyName) advertiserUpdates.companyName = companyName;
    if (websiteLink) advertiserUpdates.websiteLink = websiteLink;
    if (hotline) advertiserUpdates.hotline = hotline;
    if (companyProfile) advertiserUpdates.companyProfile = companyProfile;

    const userUpdates = {};
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      const emailExists = await userModel.findOne({ email });
      if (emailExists && email !== advertiser.user.email) {
        return res.status(400).json({ message: "Email already in use." });
      }

      userUpdates.email = email;
    }

    const updatedAdvertiser = await advertiserModel.findByIdAndUpdate(
        advertiser._id,
        advertiserUpdates,
        { new: true }
    );

    const updatedUser = await userModel.findByIdAndUpdate(id, userUpdates, {
      new: true,
    });

    res.status(200).json({
      message: "Profile updated successfully.",
      updatedAdvertiser,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile.",
      error: error.message,
    });
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

    if (
        !name ||
        !date ||
        !time ||
        !location ||
        !price ||
        !category ||
        !preferenceTags
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingActivity = await activityModel.findOne({ name });
    if (existingActivity) {
      return res.status(400).json({
        message: "Activity with this name already exists. Choose a new name.",
      });
    }

    if (!location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({
        message: "Location must include [longitude, latitude].",
      });
    }

    const [longitude, latitude] = location.coordinates;
    if (
        longitude < -180 ||
        longitude > 180 ||
        latitude < -90 ||
        latitude > 90
    ) {
      return res.status(400).json({
        message: "Coordinates must be valid: longitude (-180 to 180), latitude (-90 to 90).",
      });
    }

    const currentDate = new Date();
    if (new Date(date) < currentDate) {
      return res.status(400).json({ message: "Date must be in the future." });
    }

    const categoryDoc = await categoryModel.findOne({ _id: category });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category selected." });
    }

    const tagDocs = await preferenceTagModel.find({
      _id: { $in: preferenceTags },
    });

    if (tagDocs.length !== preferenceTags.length) {
      return res.status(400).json({
        message: "Some preference tags are invalid.",
      });
    }

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
      tags: tagDocs.map((tag) => tag._id),
      discounts,
      bookingAvailable,
      advertiser: advertiserId,
    });

    await newActivity.save();

    res.status(201).json({
      message: "Activity created successfully.",
      activity: newActivity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create activity.",
      error: error.message,
    });
  }
};
const updateActivity = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const activityId = req.params.activityId;
    const advertiserId = req.user._id;

    const activity = await activityModel
        .findById(activityId)
        .populate("advertiser");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.advertiser._id.toString() !== advertiserId) {
      return res.status(403).json({
        message: "You are not authorized to edit this activity",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0);
    const activityDate = new Date(activity.date).setHours(0, 0, 0);

    if (today > activityDate) {
      return res.status(400).json({
        message: "This activity is old and cannot be edited",
      });
    }

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
    const ticketQuery = {};

    if (tags) {
      const tagDocs = await preferenceTagModel.find({ _id: { $in: tags } });
      if (tagDocs.length !== tags.length) {
        throw new Error("Some preference tags are invalid");
      }
      query.tags = tags;
    }

    if (category) {
      const categoryDoc = await categoryModel.findById(category);
      if (!categoryDoc) {
        throw new Error("Invalid category selected");
      }
      query.category = category;
    }

    if (date) {
      const currentDate = new Date();
      const activityDate = new Date(date);
      if (activityDate < currentDate) {
        throw new Error("Date must be in the future");
      }
      query.date = date;
      ticketQuery.date = date;
    }

    if (name) {
      query.name = name;
      ticketQuery.name = name;
    }

    if (location) {
      query.location = location;
      ticketQuery.locationName = location.name;
    }

    if (price) query.price = price;
    if (time) {
      query.time = time;
      ticketQuery.time = time;
    }
    if (discounts) query.discounts = discounts;
    if (rating) query.rating = rating;
    if (bookingAvailable !== undefined)
      query.bookingAvailable = bookingAvailable;

    const activityTickets = await activityTicketModel.find({
      activity: activity._id,
      status: "active",
    });

    if (activityTickets.length > 0) {
      for (const t of activityTickets) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        const user = await userModel.findById(t.tourist);
        const text = emailTemplate.notifyBookedUsersForUpdateInActivity(
            ticketQuery.name,
            ticketQuery.date,
            ticketQuery.locationName,
            user.username
        );
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Update: Your Upcoming Activity has been updated!",
          text,
        };
        await transporter.sendMail(mailOptions);
      }
    }

    await activityModel.findByIdAndUpdate(activityId, query, { session });
    await activityTicketModel.updateMany(
        { activity: activity._id },
        ticketQuery,
        { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Activity updated successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      message: "Failed to update activity",
      error: error.message,
    });
  }
};
const deleteActivity = async (req, res) => {
  try {
    const activityId = req.params.activityid.trim();
    const advertiserId = req.user._id;

    const activity = await activityModel
        .findById(activityId)
        .populate("advertiser");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (
        activity.advertiser &&
        activity.advertiser._id.toString() !== advertiserId
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this activity",
      });
    }

    const activityTickets = await activityTicketModel.find({
      activity: activityId,
      status: "active",
    });

    const today = new Date();
    today.setHours(0, 0, 0);
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0);

    if (today < activityDate && activityTickets.length > 0) {
      return res.status(400).json({
        message: "Cannot delete activity as it is booked by users",
      });
    }

    await activityModel.findByIdAndDelete(activityId);
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete activity",
      error: error.message,
    });
  }
};
const getMyActivities = async (req, res) => {
  try {
    const advertiserId = req.user._id;
    const activities = await activityModel
        .find({ advertiser: advertiserId })
        .populate({
          path: "category",
          select: "name description -_id",
        })
        .populate({
          path: "tags",
          select: "name description -_id",
        })
        .select(
            "name date time location price discounts bookingAvailable rating _id"
        )
        .sort({ createdAt: 1 });

    if (activities.length === 0) {
      return res
          .status(404)
          .json({ message: "No activities found for this advertiser" });
    }

    res.status(200).json({
      message: "Activities retrieved successfully",
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve activities",
      error: error.message,
    });
  }
};
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Logo file is required" });
    }

    const file = req.file;
    let imageUrl;

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(new Error("Failed to upload logo"));
            } else {
              imageUrl = { url: result.secure_url, publicId: result.public_id };
              resolve();
            }
          }
      );
      uploadStream.end(file.buffer);
    });

    await advertiserModel.findOneAndUpdate(
        { user: req.user._id },
        { logo: imageUrl }
    );

    res.status(200).json({
      message: "Logo uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload logo",
      error: error.message,
    });
  }
};
const createTransportation = async (req, res) => {
  try {
    const { name, time, date, type, pickupLocation, dropOffLocation, price } =
        req.body;

    if (
        !name ||
        !time ||
        !date ||
        !type ||
        !pickupLocation ||
        !dropOffLocation ||
        !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await transportationModel.findOne({ name });
    if (exists) {
      return res.status(400).json({
        message: "Transportation with this name already exists",
      });
    }

    const newTransportation = new transportationModel({
      advertiser: req.user._id,
      name,
      time,
      date,
      type,
      price,
      pickupLocation,
      dropOffLocation,
    });

    await newTransportation.save();

    res.status(201).json({
      message: "Transportation created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create transportation",
      error: error.message,
    });
  }
};
const getAllTransportation = async (req, res) => {
  try {
    const transportations = await transportationModel
        .find()
        .populate("advertiser", "username");

    if (!transportations || transportations.length === 0) {
      return res
          .status(404)
          .json({ message: "No transportation records found." });
    }

    return res.status(200).json({
      message: "Transportations retrieved successfully.",
      transportations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve transportations.",
      error: error.message,
    });
  }
};
const deleteTransportation = async (req, res) => {
  try {
    const { transportationId } = req.body;

    if (!transportationId) {
      return res
          .status(400)
          .json({ message: "Please specify a transportation to delete." });
    }

    const transportation = await transportationModel.findById(transportationId);

    if (!transportation) {
      return res.status(404).json({ message: "Transportation not found." });
    }

    if (req.user._id.toString() !== transportation.advertiser.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this transportation.",
      });
    }

    if (transportation.touristsBooked.length > 0) {
      return res.status(400).json({
        message: "Transportation is booked by tourists and cannot be deleted.",
      });
    }

    await transportationModel.findByIdAndDelete(transportationId);

    return res.status(200).json({
      message: "Transportation deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete transportation.",
      error: error.message,
    });
  }
};
const editTransportation = async (req, res) => {
  try {
    const { transportationId } = req.body;

    if (!transportationId) {
      return res
          .status(400)
          .json({ message: "Please specify a transportation to edit." });
    }

    const transportation = await transportationModel.findById(transportationId);

    if (!transportation) {
      return res.status(404).json({ message: "Transportation not found." });
    }

    if (req.user._id.toString() !== transportation.advertiser.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit this transportation.",
      });
    }

    if (transportation.touristsBooked.length > 0) {
      return res.status(400).json({
        message: "Transportation is booked by tourists and cannot be edited.",
      });
    }

    const { name, dropOffLocation, pickupLocation, time, type, cost } =
        req.body;

    if (name) transportation.name = name;
    if (dropOffLocation) transportation.dropOffLocation = dropOffLocation;
    if (pickupLocation) transportation.pickupLocation = pickupLocation;
    if (time) transportation.time = time;
    if (type) transportation.type = type;
    if (cost) transportation.cost = cost;

    await transportation.save();

    return res.status(200).json({
      message: "Transportation updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update transportation.",
      error: error.message,
    });
  }
};
const getMyTransportations = async (req, res) => {
  try {
    const transportations = await transportationModel.find({
      advertiser: req.user._id,
    });

    if (!transportations || transportations.length === 0) {
      return res
          .status(404)
          .json({ message: "No transportations found for this user." });
    }

    return res.status(200).json({
      message: "Transportations retrieved successfully.",
      transportations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve transportations.",
      error: error.message,
    });
  }
};
const viewRevenue = async (req, res) => {
  try {
    const tickets = await activityTicketModel.find({ status: "active" });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No revenue data found." });
    }

    const { date } = req.query;
    let targetDate = date ? new Date(date) : null;

    if (targetDate && isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    const myTickets = await Promise.all(
        tickets.map(async (t) => {
          const activity = await activityModel.findById(t.activity);
          if (activity && activity.advertiser.toString() === req.user._id.toString()) {
            return t;
          }
          return null;
        })
    ).then((tickets) => tickets.filter(Boolean));

    let report = [];
    let totalRevenue = 0;

    for (const ticket of myTickets) {
      const receipt = await receiptModel.findById(ticket.receipt);
      if (receipt && receipt.status === "successful") {
        const activity = await activityModel.findById(ticket.activity);
        report.push({
          name: activity.name,
          date: activity.date,
          price: receipt.price,
        });
      }
    }

    const revenueMap = report.reduce((map, row) => {
      if (!map[row.name]) {
        map[row.name] = { date: row.date, count: 1, price: row.price };
      } else {
        map[row.name].count++;
      }
      return map;
    }, {});

    const results = Object.entries(revenueMap).map(([name, data]) => ({
      name,
      count: data.count,
      date: data.date,
      price: data.price,
    }));

    const filteredResults = targetDate
        ? results.filter(
            (r) =>
                new Date(r.date).toISOString() === targetDate.toISOString()
        )
        : results;

    filteredResults.forEach((r) => {
      totalRevenue += r.price * r.count;
    });

    return res.status(200).json({
      message: "Revenue data retrieved successfully.",
      filteredResults,
      totalRevenue,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve revenue data.",
      error: error.message,
    });
  }
};
const viewTotalTourists = async (req, res) => {
  try {
    const tickets = await activityTicketModel.find({ status: "active" });

    const myTickets = await Promise.all(
        tickets.map(async (t) => {
          const activity = await activityModel.findById(t.activity);
          if (
              activity &&
              activity.advertiser.toString() === req.user._id.toString() &&
              new Date(activity.date) < new Date().setHours(0, 0, 0, 0)
          ) {
            return t;
          }
          return null;
        })
    ).then((tickets) => tickets.filter((t) => t !== null));

    if (myTickets.length === 0) {
      return res.status(404).json({
        message: "No tourists have attended your activities yet.",
      });
    }

    const report = myTickets.map((t) => {
      const activity = activityModel.findById(t.activity);
      return {
        name: activity.name,
        date: activity.date,
      };
    });

    const map = report.reduce((acc, row) => {
      if (!acc[row.name]) {
        acc[row.name] = { date: row.date, count: 1 };
      } else {
        acc[row.name].count++;
      }
      return acc;
    }, {});

    const result = Object.entries(map).map(([name, data]) => ({
      name,
      date: data.date,
      totalTourists: data.count,
    }));

    if (req.query.month) {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      const monthIndex = months.indexOf(req.query.month.toLowerCase());

      if (monthIndex === -1) {
        return res.status(400).json({ message: "Invalid month name." });
      }

      const filteredResults = result.filter(
          (t) => new Date(t.date).getMonth() === monthIndex
      );

      if (filteredResults.length === 0) {
        return res
            .status(404)
            .json({ message: "No data matches your search criteria." });
      }

      return res.status(200).json(filteredResults);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve tourist data.",
      error: error.message,
    });
  }
};
const disableActivityBooking = async (req, res) => {
  try {
    const { activityId } = req.body;

    if (!activityId) {
      return res.status(400).json({ message: "Please specify an activity to disable." });
    }

    const activity = await activityModel.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    if (activity.advertiser.toString() !== req.user._id.toString()) {
      return res
          .status(403)
          .json({ message: "You are not authorized to edit this activity." });
    }

    if (!activity.bookingAvailable) {
      return res.status(400).json({ message: "Activity booking is already disabled." });
    }

    activity.bookingAvailable = false;
    await activity.save();

    return res.status(200).json({ message: "Activity booking disabled successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to disable activity booking.",
      error: error.message,
    });
  }
};
const enableActivityBooking = async (req, res) => {
  try {
    const { activityId } = req.body;

    if (!activityId) {
      return res.status(400).json({ message: "Please specify an activity to enable." });
    }

    const activity = await activityModel.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    if (activity.advertiser.toString() !== req.user._id.toString()) {
      return res
          .status(403)
          .json({ message: "You are not authorized to edit this activity." });
    }

    if (activity.bookingAvailable) {
      return res.status(400).json({ message: "Activity booking is already enabled." });
    }

    activity.bookingAvailable = true;
    await activity.save();

    const tourists = await touristModel.find({
      interestedEvents: activityId,
    });

    if (tourists.length > 0) {
      const io = req.app.get("io");
      for (const t of tourists) {
        notifyUser(io, t.user, "activity", activity.name);
        t.interestedEvents = t.interestedEvents.filter(
            (e) => e.toString() !== activityId.toString()
        );
        await t.save();
      }
    }

    return res.status(200).json({ message: "Activity booking enabled successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to enable activity booking.",
      error: error.message,
    });
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
  viewRevenue,
  viewTotalTourists,
  disableActivityBooking,
  enableActivityBooking,
};
