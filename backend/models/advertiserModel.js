const mongoose = require('mongoose');

const advertiserSchema = new mongoose.schema({
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
        required: true
    },
    websiteLink:{
        type:String,
        required:true
    },
    hotline:{
        type:Number,
        required:true
    },
    companyProfile:{
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
const advertiserModel = mongoose.model('advertiser', advertiserSchema);
module.export = advertiserModel;