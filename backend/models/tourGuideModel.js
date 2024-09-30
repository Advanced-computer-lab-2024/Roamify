const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    
    email:{
        type:String,
        required:true,
        unique: true

    },
    userName:{
        type:String,
        required:true,
        unique: true,

    },
    password:{
        type:String,
        required: true,
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    yearsOfExperience:{
        type:Number,
        required:true
    },
    previousWork:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['active', 'deactivated', 'pending'], 
    default: 'pending'  
    },
    role:{
        type:String,
        enum: ['advertiser', 'seller', 'tour guide'],   
}




});
const tourGuideModel = mongoose.Model('tourGuide', tourGuideSchema);
module.exports = tourGuideModel;