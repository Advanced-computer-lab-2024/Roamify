const mongoose = require('mongoose');

const businessUserSchema = new mongoose.schema({
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
    }



});
const businessUserModel = mongoose.model('businessUser', businessUserSchema);
module.export = businessUserModel;