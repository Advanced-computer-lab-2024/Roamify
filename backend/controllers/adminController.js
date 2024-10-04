const TourismGovernor = require("../models/tourismGovernorModel");
const User = require("../models/userModel");
const Advertiser = require("../models/advertiserModel");
const Seller = require("../models/sellerModel");
const TourGuide = require("../models/tourGuideModel");
const Tourist = require("../models/touristModel");

const addTourismGovernor = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const governorExistsByUsername = await TourismGovernor.findOne({
      username,
    });
    const governorExistsByEmail = await TourismGovernor.findOne({ email });
    if (governorExistsByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (governorExistsByUsername) {
      return res.status(400).json({ message: "Username already Exists" });
    }
    const newGovernor = new TourismGovernor({
      username,
      password,
      email,
    });

    await newGovernor.save();

    res.status(201).json({
      _id: newGovernor._id,
      username: newGovernor.username,
      email: newGovernor.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "advertiser") {
      await Advertiser.findOneAndDelete({ user: userId });
    }

    if (user.role === "seller") {
      await Seller.findOneAndDelete({ user: userId });
    }

    if (user.role === "tourGuide") {
      await TourGuide.findOneAndDelete({ user: userId });
    }
    if (user.role === "tourismGovernor") {
      await TourismGovernor.findOneAndDelete({ user: userId });
    }
    if (user.role === "tourist") {
      await Tourist.findOneAndDelete({ user: userId });
    }

    res
      .status(200)
      .json({ message: "User and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
;

const addAdmin = async (req, res) => {
  const { userName, password ,email} = req.body;

  try {
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new User({
      userName,
      email,
      password,
      status: "active",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "New admin created successfully",
      admin: {
        id: newAdmin._id,
        userName: newAdmin.userName,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTourismGovernor, deleteUser, addAdmin };
