const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    sellerId:{
        type:String
    },
    name:{
        type:String,
        required:true

    },
    description:{
        type:String
    },
    price:{
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