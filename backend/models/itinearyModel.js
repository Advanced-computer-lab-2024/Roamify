const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    tourGuideID:{
        type:String
    },
    activities:{
        type:[string],
    },
    locations:{
        type:[string]
    },
    language:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    availableDates:{
        type:[Date]
    }
    

},{timestamps:true});

const itinearyModel = mongoose.Model('itineary', itinerarySchema);
module.exports = itinearyModel;



