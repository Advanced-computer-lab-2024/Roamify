const User = require("../models/userModel");
const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const sellerModel = require("../models/sellerModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const validator = require("validator");
const bcrypt = require("bcrypt");


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
      return res.status(400).json({ message: "Password doesn't meet minimum requirements" });
    }

    // Generate a unique email
    const lastGovernor = await userModel.findOne({ role: "tourismGovernor" }).sort({ createdAt: -1 });
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

    // Perform deletion based on role
    let deletionResult;
    switch (user.role) {
      case "tourist":
        deletionResult = await Promise.all([
          touristModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res.status(200).json({ message: "Tourist deleted successfully" });

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
        return res.status(200).json({ message: "Advertiser deleted successfully" });

      case "tourGuide":
        deletionResult = await Promise.all([
          tourGuideModel.findOneAndDelete({ user: userId }),
          userModel.findByIdAndDelete(userId),
        ]);
        return res.status(200).json({ message: "Tour Guide deleted successfully" });

      case "tourismGovernor":
        await userModel.findByIdAndDelete(userId);
        return res.status(200).json({ message: "Tourism Governor deleted successfully" });

      default:
        return res.status(400).json({ message: "Invalid role, unable to delete user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};



const addAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password doesn't meet minimum requirements" });
    }

    // Find the last created admin and determine the next number for email
    const lastAdmin = await User.findOne({ role: "admin" }).sort({ createdAt: -1 });
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
    const newAdmin = new User({
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


module.exports = { addTourismGovernor, deleteUser, addAdmin };
