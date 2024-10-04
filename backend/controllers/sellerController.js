const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');

const createProfile = async (req,res)=>{
    try{
        const userId = req.params.id;
        const {fName,lName,description} = req.body;
        await userModel.findByIdAndUpdate(userId,{status:'active'});
        const newSeller = new sellerModel({
            user:userId,
            fName,
            lName,
            description
        });
        await newSeller.save();
        res.status(200).json({message:'success',user:newSeller});

    }
    catch(e){
        res.status(404).json({message:'failed',error:e});

    }

};
const getProfile = async(req,res)=>{
    try{
        const id = req.params.id;
        const details = await sellerModel.findById(id).populate('user');
        res.status(200).json({details});
    }
    catch(e){
        res.status(401).json({error:e});
        console.log(e);
    }
}

const updateProfile = async (req, res) => {
    const sellerId = req.params.id;
    
    const {
      fName,
      lName,
      userName,
      email,
      password,
      description
    } = req.body;
  
    const userUpdates = {};
    const sellerUpdates = {};
    
    const seller = await sellerModel.findById(sellerId).populate('user'); 
  
    
    const userId = seller.user._id;
    
    if (fName) sellerUpdates.fName = fName; 
    if (lName) sellerUpdates.lName = lName; 
    
    if (userName) {
      const result = await userModel.findOne({ userName: userName });
      if (result&&userName!=seller.user.userName) {
        return res.status(400).json({ error: 'userName already exists' });
      } else {
        userUpdates.userName = userName;
      }
    }
  
    if (email) {
      const result = await userModel.findOne({ email: email });
      if (result&&email!=seller.user.email) {
          return res.status(400).json({ error: 'email already exists' });
        
  
      } else {
        userUpdates.email = email;
      }
    }
  
    
    if (password) userUpdates.password = password;
    if (description) sellerUpdates.description = description;
  
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, userUpdates, { new: true });
      const updatedSeller = await sellerModel.findByIdAndUpdate(sellerId, sellerUpdates, { new: true });
  
      if (updatedUser || updatedSeller) {
        return res.status(200).json({ message: 'updated', updatedSeller: updatedSeller });
      } else {
        return res.status(404).json({ message: 'No updates made' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'failed', error: e });
    }
  };
  
module.exports = {createProfile,getProfile,updateProfile};