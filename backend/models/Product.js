const mongoose = require('mongoose')


const Product_Schema = new mongoose.Schema({
    sellerId:{
        type:String
    },
    Name:{
        type:String,
        required:true

    },
    description:{
        type:String
    },
    Price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['active','archived']
    }

})