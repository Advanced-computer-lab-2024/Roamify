const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated', 'pending'],
        default: 'pending'
    },
    role: {
        type: String,
        enum: ['seller', 'advertiser', 'tourGuide','tourismGovernor','tourist','admin'],
        default: 'pending'
    }

},{timestamps:true});

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;