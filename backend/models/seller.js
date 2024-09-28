const mongoose = require('mongoose');

const sellerSchema = new mongoose.schema({
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
    description:{
        type:String ,
        required:true
    }



});
const sellerModel = mongoose.model('seller', sellerSchema);
module.export = sellerModel;