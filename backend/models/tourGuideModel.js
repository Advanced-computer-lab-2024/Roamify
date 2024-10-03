const mongoose = require('mongoose');
const businessUser = require('./businessUserModel');

const tourGuideSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'businessUser',
        unique:true
      },
    mobileNumber: {
        type: Number,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    previousWork: {
        type: String,
        required: true
    }
    
},{timestamps:true});
const tourGuideModel = mongoose.model('tourguide', tourGuideSchema);
module.exports = tourGuideModel;
