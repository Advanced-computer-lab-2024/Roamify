const mongoose = require('mongoose');
const businessUser = require('../models/businessUserModel');

const advertiserSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'businessUser',
        unique:true
      },
    websiteLink: {
        type: String,
        required: true
    },
    hotline: {
        type: Number,
        required: true
    },
    companyProfile: {
        type: String,
        required: true
    }
   
},{timestamps:true});
const advertiserModel = mongoose.model('advertiser', advertiserSchema);
module.exports = advertiserModel;