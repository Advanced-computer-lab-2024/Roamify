const businessUserModel = require('../models/businessUserModel');
const sellerModel = require('../models/sellerModel');

const createProfile = async (req,res)=>{
    try{
        const userId = req.params.id;
        const {description} = req.body;
        await businessUserModel.findByIdAndUpdate(userId,{status:'active'});
        const newSeller = new sellerModel({
            user:userId,
            description
        });
        await newSeller.save();
        res.status(200).json({message:'success',user:newSeller});

    }
    catch(e){
        res.status(404).json({message:'failed',error:e});

    }

};
module.exports = {createProfile};