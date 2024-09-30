const mongoose = require('mongoose')


const Itinerary_Schema = new mongoose.Schema({
    tourGuideID:{
        type:String
    },
    Activities:{
        type:[string],
    },
    Locations:{
        type:[string]
    },
    Language:{
        type:String
    },
    Price:{
        type:Number,
        required:true
    },
    availableDates:{
        type:[Date]
    }
    

},{timestamps:true})






