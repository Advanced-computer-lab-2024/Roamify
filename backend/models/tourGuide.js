const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.schema({
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
        required:true

    },
    userName:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required: true
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
    }




});
const tourGuideModel = mongoose.model('tourGuide', tourGuideSchema);
module.export = tourGuideModel;