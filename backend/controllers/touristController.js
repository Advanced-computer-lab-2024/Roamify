const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");
const validator = require("validator");

// Helper function to check if a user is an adult based on date of birth
function isAdult(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

// Create Profile
const createProfile = async (req, res) => {
  const id = req.user._id;

  // Check if a profile already exists for this user
  if (id) {
    const existingProfile = await touristModel.findOne({ user: id });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already created" });
    }
  }

  const { firstName, lastName, mobileNumber, nationality, dateOfBirth, occupation } = req.body;
  try {
    const adult = isAdult(dateOfBirth);

    // Create and save a new tourist profile
    const tourist = new touristModel({
      user: id,
      firstName,
      lastName,
      mobileNumber,
      nationality,
      dateOfBirth,
      occupation,
      adult,
      wallet: null, // Setting wallet to null initially
    });
    await tourist.save();
    res.status(201).json({ message: "Created tourist successfully" });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const details = await touristModel
        .findOne({ user: id })
        .populate({
          path: "user",
          select: "username email role status", // Only include these fields from user
        })
        .populate({
          path: "wallet",
          select: "cardNumber cardValidUntil", // Only specific wallet fields
        })
        .select("-__v"); // Exclude Mongoose version key

    if (!details) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Construct response
    const responseData = {
      username: details.user.username,
      email: details.user.email,
      role: details.user.role,
      firstName: details.firstName,
      lastName: details.lastName,
      mobileNumber: details.mobileNumber,
      nationality: details.nationality,
      dateOfBirth: details.dateOfBirth,
      occupation: details.occupation,
      adult: details.adult,
      cardNumber: details.wallet?.cardNumber || "",
      cardValidUntil: details.wallet?.cardValidUntil || "",
    };

    return res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const id = req.user._id;
  const { firstName, lastName, email, mobileNumber, nationality, occupation } = req.body;

  const userUpdates = {};
  const touristUpdates = {};

  try {
    const tourist = await touristModel.findOne({ user: id }).populate("user");

    // Update tourist fields if provided
    if (firstName) touristUpdates.firstName = firstName;
    if (lastName) touristUpdates.lastName = lastName;
    if (mobileNumber) touristUpdates.mobileNumber = mobileNumber;
    if (nationality) touristUpdates.nationality = nationality;
    if (occupation) touristUpdates.occupation = occupation;

    // Check for and handle email update
    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== tourist.user.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
      }
      userUpdates.email = email;
    }

    

    // Perform updates
    await userModel.findByIdAndUpdate(id, userUpdates, { new: true });
    await touristModel.findByIdAndUpdate(tourist._id, touristUpdates, { new: true });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Failed to update profile", error: e.message });
  }
};

// Add Wallet
const addWallet = async (req, res) => {
  try {
    const id = req.user._id;
    const { cardNumber, cardValidUntil } = req.body;
    const tourist = await touristModel.findOne({ user: id });

    if (!tourist.adult) throw Error("Tourist must be an adult to add a wallet.");
    if (tourist.wallet) throw Error("A wallet already exists, remove it first.");

    if (!cardNumber || !cardValidUntil) throw Error("Please provide card details.");

    const currentDate = new Date();
    const validUntilDate = new Date(cardValidUntil);

    if (validUntilDate < currentDate) throw Error("Card is expired.");
    if (cardNumber.length !== 14) throw Error("Card number must be 14 digits.");

    // Create and save the wallet
    const wallet = new walletModel({ cardNumber, cardValidUntil });
    const savedWallet = await wallet.save();

    // Update tourist profile with wallet
    await touristModel.findByIdAndUpdate(tourist._id, { wallet: savedWallet._id });

    return res.status(201).json({ message: "Card added successfully" });
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};


module.exports = { createProfile, getProfile, updateProfile, addWallet};
