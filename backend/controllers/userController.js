const userModel = require("../models/userModel");
const touristModel = require("../models/touristModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const sellerModel = require("../models/sellerModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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



module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUsersByRole,
};
