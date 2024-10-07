const userModel = require("../models/userModel");
const touristModel = require("../models/touristModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const sellerModel = require("../models/sellerModel");

const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (username) {
      const result = await userModel.findOne({ username: username });
      if (result && username) {
        return res.status(400).json({ error: "username already exists" });
      }
    } //validation of username existence

    if (email) {
      const result = await userModel.findOne({ email: email });
      if (result && email) {
        return res.status(400).json({ error: "email already exists" });
      }
    } //validation of email existence

    const status =
      role === "tourist" || role === "tourismGovernor" ? "active" : "pending";
    const newBUser = new userModel({
      username,
      email,
      password,
      status,
      role,
    });
    await newBUser.save();

    res.status(201).json({ message: "success", user: newBUser });
  } catch (e) {
    if ((e.name = "ValidationError")) {
      res.status(400).json({ message: "invalid email" }); //testing for validity of email format
    }
    console.log(e);
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userModel.findById(id);
    if (details) res.status(200).json(details);
  } catch (e) {
    res.status(400).json({ message: "failed", error: e });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const role = user.role;
    const status = user.status;
    if (role === "tourist") {
      user = await touristModel.findOne({ user: user._id }).populate("user");
      return res.status(200).json({ user });
    }

    if (
      status === "active" &&
      role !== "tourismGovernor" &&
      role !== "admin" &&
      role !== "tourist"
    ) {
      if (role === "advertiser") {
        user = await advertiserModel
          .findOne({ user: user._id })
          .populate("user");
        return res.status(200).json({ user });
      }

      if (role === "seller") {
        user = await sellerModel.findOne({ user: user._id }).populate("user");
        return res.status(200).json({ user });
      }

      if (role === "tourGuide") {
        user = await tourGuideModel
          .findOne({ user: user._id })
          .populate("user");
        return res.status(200).json({ user });
      }
    }
    console.log(role);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
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

    // If no users are found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found with role ${role}` });
    }

    // Return the list of users
    res.status(200).json({
      message: `Users with role ${role} retrieved successfully`,
      users,
    });
  } catch (error) {
    console.error("Error retrieving users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await userModel.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
};
module.exports = { createUser, getUser, loginUser, getUsersByRole, deleteUser };
