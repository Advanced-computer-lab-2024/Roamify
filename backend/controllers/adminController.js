const User = require("../models/userModel");
const Advertiser = require("../models/advertiserModel");
const Seller = require("../models/sellerModel");
const TourGuide = require("../models/tourGuideModel");
const Tourist = require("../models/touristModel");
const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const sellerModel = require("../models/sellerModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");

const addTourismGovernor = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const governorExistsByUsername = await userModel.findOne({
      username,
    });
    const governorExistsByEmail = await userModel.findOne({ email });
    if (governorExistsByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (governorExistsByUsername) {
      return res.status(400).json({ message: "Username already Exists" });
    }
    const newGovernor = new userModel({
      username,
      password,
      email,
      role: "tourismGovernor",
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
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    const role = user.role;
    if (role === "tourist") {
      await touristModel.findOneAndDelete({ user: user });
      await userModel.findByIdAndDelete(userId);
      return res.status(200).json({ message: "Tourist deleted successfully" });
    }

    if (role === "seller") {
      await sellerModel.findOneAndDelete({ user: user });
      await userModel.findByIdAndDelete(userId);

      return res.status(200).json({ message: "Seller deleted successfully" });
    }

    if (role === "advertiser") {
      await advertiserModel.findOneAndDelete({ user: user });
      await userModel.findByIdAndDelete(userId);

      return res
        .status(200)
        .json({ message: "Advertiser deleted successfully" });
    }

    if (role === "tourGuide") {
      await tourGuideModel.findOneAndDelete({ user: user });
      await userModel.findByIdAndDelete(userId);

      return res
        .status(200)
        .json({ message: "Tour Guide deleted successfully" });
    }

    console.log(user.role);
    return res
      .status(400)
      .json({ message: "Invalid role, unable to delete user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addAdmin = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new User({
      username,
      email,
      password,
      status: "active",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "New admin created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTourismGovernor, deleteUser, addAdmin };
