const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    tourGuideID:{
        type:String
    },
    activities:{
        type:[String],
    },
    locations:{
        type:[String]
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
    },
    preference:{
        type:String,
        enum:['historic areas','beaches','family-friendly','shopping']

    },
    tagPlace: {
        type: String // Ensure this field is present
    },
    rating:{
        type:Number
    }
    

},{timestamps:true})
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports= Itinerary;





