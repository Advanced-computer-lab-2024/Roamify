const touristModel = require('../models/touristModel');
const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');

const createProfile = async (req,res)=>{

    const id = req.params.id;
    const {
      fName,
      lName,
      mobileNumber,
      nationality,
      dateofBirth,
      occupation,

      } = req.body;
      try{
        const newWallet = new walletModel({});
       await newWallet.save();
        const tourist = new touristModel({
        user:id,
        fName,
        lName,
        mobileNumber,
        nationality,
        dateofBirth,
        occupation,
        wallet:newWallet._id

        });
      
        await tourist.save();
        res.status(201).json({tourist:tourist})

      }
      catch(e){
        res.status(401).json({error:e});
        console.log(e);

      }
      
}
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await touristModel.findById(id).populate('user').populate('wallet');
    if(details)
      res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message:"failed",error:e});
  }
};

const updateProfile = async (req, res) => {
  const touristId = req.params.id;
  
  const {
    fName,
    lName,
    userName,
    email,
    password,
    mobileNumber,
    nationality,
    occupation,
    cardNumber,
    cardValidUntil
  } = req.body;
  

  const userUpdates = {};
  const touristUpdates = {};
  const walletUpdates = {};
  
  const tourist = await touristModel
  .findById(touristId)
  .populate('user')
  .populate('wallet');

  

  
  const userId = tourist.user._id;
  
  const walletId = tourist.wallet._id;
  
  if (fName) touristUpdates.fName = fName; 
  if (lName) touristUpdates.lName = lName; 
  
  if (userName) {
    const result = await userModel.findOne({ userName: userName });
    if (result&&userName!=tourist.user.userName) {
      return res.status(400).json({ error: 'userName already exists' });
    } else {
      userUpdates.userName = userName;
    }
  }

  if (email) {
    const result = await userModel.findOne({ email: email });
    if (result&&email!=tourist.user.email) {
        return res.status(400).json({ error: 'email already exists' });
      

    } else {
      userUpdates.email = email;
    }
  }
 
  

  
  if (password) userUpdates.password = password;
  if (mobileNumber) touristUpdates.mobileNumber = mobileNumber;
  if (nationality) touristUpdates.nationality = nationality;
  if (occupation) touristUpdates.occupation = occupation;
  if (cardNumber) walletUpdates.cardNumber = cardNumber;
  if (cardValidUntil) {
    const today = new Date(); // Get today's date

    // Convert cardValidUntil to a Date object if it's a string
    const cardValidUntilDate = new Date(cardValidUntil);

    // Compare cardValidUntil with today's date
    if (cardValidUntilDate > today) {
        walletUpdates.cardValidUntil = cardValidUntilDate; // Store as a Date object
    } else {
        return res.status(401).json({ message: 'Please enter a card that has not expired yet' });
    }
}

  

  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, userUpdates, { new: true });
    const updatedTourist = await touristModel.findByIdAndUpdate(touristId, touristUpdates, { new: true });
    const updatedWallet = await walletModel.findByIdAndUpdate(walletId, walletUpdates, { new: true });

    if (updatedUser || updatedTourist || updatedWallet ) {
      return res.status(200).json({ message: 'updated', updatedTourist: updatedTourist,wallet:updatedWallet,user:updatedUser});
    } else {
      return res.status(404).json({ message: 'No updates made' });
    }
  } catch (e) {
    return res.status(400).json({ message: 'failed', error: e });
  }
};
module.exports = {createProfile,getProfile,updateProfile};