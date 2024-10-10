const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const walletModel = require("../models/walletModel");

const createProfile = async (req, res) => {
  const id = req.params.id;

  if (id) {
    const result = await touristModel.findOne({ user: id });
    if (result && id) {
      return res.status(400).json({ error: "profile already created" });
    }
  } //check for existence of profile for this user

  const { fName, lName, mobileNumber, nationality, dateofBirth, occupation } =
    req.body;
  try {
    const newWallet = new walletModel({});
    await newWallet.save();
    const tourist = new touristModel({
      user: id,
      fName,
      lName,
      mobileNumber,
      nationality,
      dateofBirth,
      occupation,
      wallet: newWallet._id,
    });
    await tourist.save();
    const newTourist = await touristModel.findById(tourist).populate("user");
    res.status(201).json({ tourist: newTourist });
  } catch (e) {
    res.status(401).json({ error: e });
    console.log(e);
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await touristModel
      .findById(id)
      .populate("user", "email") // Specify fields to populate
      .populate("wallet"); // Populate the wallet details

    if (details) {
      return res.status(200).json({
        fName: details.fName,
        lName: details.lName,
        mobileNumber: details.mobileNumber,
        nationality: details.nationality,
        dateofBirth: details.dateofBirth,
        occupation: details.occupation,
        email: details.user ? details.user.email : null, // Populate user email
        wallet: details.wallet
          ? {
              cardNumber: details.wallet.cardNumber,
              availableBalance: details.wallet.availableBalance,
              cardValidUntil: details.wallet.cardValidUntil,
            }
          : null, // Populate wallet details
      });
    } else {
      return res.status(404).json({ message: "Profile not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err });
  }
};

const updateProfile = async (req, res) => {
  const touristId = req.params.id;

  const {
    fName,
    lName,
    email,
    password,
    mobileNumber,
    nationality,
    occupation,
    cardNumber,
    cardValidUntil,
  } = req.body;

  const userUpdates = {};
  const touristUpdates = {};
  const walletUpdates = {};

  try {
    const tourist = await touristModel
      .findById(touristId)
      .populate("user")
      .populate("wallet");

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    const userId = tourist.user._id;
    const walletId = tourist.wallet._id;

    // Tourist updates
    if (fName) touristUpdates.fName = fName;
    if (lName) touristUpdates.lName = lName;
    if (mobileNumber) touristUpdates.mobileNumber = mobileNumber;
    if (nationality) touristUpdates.nationality = nationality;
    if (occupation) touristUpdates.occupation = occupation;

    // User (email/password) updates
    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== tourist.user.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      userUpdates.email = email;
    }
    if (password) userUpdates.password = password;

    // Wallet updates
    if (cardNumber) walletUpdates.cardNumber = cardNumber;
    if (cardValidUntil) {
      const today = new Date();
      const cardValidUntilDate = new Date(cardValidUntil);
      if (cardValidUntilDate > today) {
        walletUpdates.cardValidUntil = cardValidUntilDate;
      } else {
        return res
          .status(401)
          .json({ message: "Please enter a card that has not expired yet" });
      }
    }

    // Perform the updates
    const updatedUser = await userModel.findByIdAndUpdate(userId, userUpdates, {
      new: true,
    });
    const updatedTourist = await touristModel.findByIdAndUpdate(
      touristId,
      touristUpdates,
      { new: true }
    );
    const updatedWallet = await walletModel.findByIdAndUpdate(
      walletId,
      walletUpdates,
      { new: true }
    );

    if (updatedUser || updatedTourist || updatedWallet) {
      return res.status(200).json({
        message: "Profile updated",
        updatedTourist,
        updatedUser,
        updatedWallet,
      });
    } else {
      return res.status(404).json({ message: "No updates made" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "Failed to update profile", error: e });
  }
};
module.exports = { createProfile, getProfile, updateProfile };
