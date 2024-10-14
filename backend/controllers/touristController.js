const touristModel = require("../models/touristModel");
const userModel = require("../models/userModel");
const tourGuideModel = require("../models/tourGuideModel");
const walletModel = require("../models/walletModel");
const bcrypt = require('bcrypt');
const validator = require('validator');

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
    res.status(201).json({message:'created tourist successfully'});
  } catch (e) {
    res.status(401).json({ error: e });
    console.log(e);
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await touristModel
      .findOne({ user: id })
      .populate({
        path: 'user',
        select: 'username email role password status' // Only return these fields from the user
      })
      .populate({
        path: 'wallet',
        select: 'cardNumber cardValidUntil' // Only return specific wallet fields
      })
      .select('-__v'); // Exclude the version key

    // Return only the specific properties
    return res.status(200).json({
      
        username: details.user.username,
        email: details.user.email,
        role: details.user.role,
        password: details.user.password,
      
      
        firstName: details.firstName,
        lastName: details.lastName,
        mobileNumber: details.mobileNumber,
        nationality: details.nationality,
        dateOfBirth: details.dateOfBirth,
        occupation: details.occupation,
        adult: details.adult,
        cardNumber : details.wallet.cardNumber?details.wallet.cardNumber:"",
        cardValidUntil : details.wallet.cardValidUntil?details.wallet.cardValidUntil:""
      
    });

  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch profile", error: err });
  }
};


const updateProfile = async (req, res) => {
  const id = req.params.id;

  const {
    firstName,
    lastName,
    email,
    oldPassword,
    newPassword,
    mobileNumber,
    nationality,
    occupation
  } = req.body;

  const userUpdates = {};
  const touristUpdates = {};

  try {
    const tourist = await touristModel
      .findOne({user:id})
      .populate("user");

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
      if(!validator.isEmail(email)){
        throw Error('Email is not valid');
      }
      userUpdates.email = email;
    }
   
    
    if (oldPassword){
      const match = await  bcrypt.compare(oldPassword,tourist.user.password);
      if(!match)
        throw Error('password does not match old password');
      if(!validator.isStrongPassword(newPassword)){
        throw Error('password doesn\'t meet minimum requirements');
      }
      const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword,salt);
  userUpdates.password = hash;

    }


    // Perform the updates
    const updatedUser = await userModel.findByIdAndUpdate(id, userUpdates, {
      new: true,
    });
    const updatedTourist = await touristModel.findByIdAndUpdate(
      tourist._id,
      touristUpdates,
      { new: true }
    );

    if (updatedUser || updatedTourist) {
      return res.status(200).json({
        message: "Profile updated successfully"
      });
    } else {
      return res.status(400).json({ message: "No updates made" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Failed to update profile", error: e.message });
  }
};

module.exports = { createProfile, getProfile, updateProfile };
