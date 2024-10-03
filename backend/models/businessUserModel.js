const mongoose = require('mongoose');

const bUserSchema = new mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true

    },
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
        enum: ['seller', 'advertiser', 'tourGuide'],
        default: 'pending'
    }

},{timestamps:true});

const bUSerModel = mongoose.model('businessUser',bUserSchema);
module.exports = bUSerModel;