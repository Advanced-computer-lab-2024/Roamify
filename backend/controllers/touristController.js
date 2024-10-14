const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const walletModel = require("../models/walletModel");

function isAdult(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't happened yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
}

const createProfile = async (req, res) => {
  const id = req.params.id;

  if (id) {
    const result = await touristModel.findOne({ user: id });
    if (result && id) {
      return res.status(400).json({ error: "profile already created" });
    }
  } //check for existence of profile for this user

  const { firstName, lastName, mobileNumber, nationality, dateOfBirth, occupation ,cardNumber,cardValidUntil} =
    req.body;
  try {
    let newWallet = null;
    if(cardNumber){
      const currentDate = new Date();
      const cardValidUntilDate = new Date(cardValidUntil);
      console.log("Current Date:", currentDate);
            console.log("Card Valid Until Date:", cardValidUntilDate);
            console.log("Is card expired?", cardValidUntilDate < currentDate);
      if(cardValidUntilDate<currentDate)
        return res.status(401).json({message:'please enter a valid card'});
      if(cardNumber.length!=14)
        return res.status(401).json({message:'please enter a valid card'});

       newWallet = new walletModel({
        cardNumber,
        cardValidUntil
  
      });
       await newWallet.save();

  
    }
    const adult = isAdult(dateOfBirth);

   
    const tourist = new touristModel({
      user: id,
      firstName,
      lastName,
      mobileNumber,
      nationality,
      dateOfBirth,
      occupation,
      adult,
      wallet: newWallet._id,
    });
    await tourist.save();
    const newTourist = await touristModel.findById(tourist);
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
      .findOne({user:id})
      .populate("user") // Specify fields to populate
      .populate("wallet"); // Populate the wallet details
      return res.status(200).json({tourist:details});

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err });
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;

  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    nationality,
    occupation
  } = req.body;

  const userUpdates = {};
  const touristUpdates = {};

  try {
    const tourist = await touristModel
      .findOne({user:id})
      .populate("user")
      .populate("wallet");

    const userId = tourist.user._id;

    // Tourist updates
    if (firstName) touristUpdates.firstName = firstName;
    if (lastName) touristUpdates.lastName = lastName;
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


    // Perform the updates
    const updatedUser = await userModel.findByIdAndUpdate(userId, userUpdates, {
      new: true,
    });
    const updatedTourist = await touristModel.findByIdAndUpdate(
      touristId,
      touristUpdates,
      { new: true }
    );

    if (updatedUser || updatedTourist) {
      return res.status(200).json({
        message: "Profile updated",
        updatedTourist,
        updatedUser
      });
    } else {
      return res.status(400).json({ message: "No updates made" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "Failed to update profile", error: e });
  }
};

module.exports = { createProfile, getProfile, updateProfile };
