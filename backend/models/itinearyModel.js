const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    tourGuideId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        
        required:true
    },
    activities:{
        type:[mongoose.Types.ObjectId],
        ref:'activity',
        required:true
    },
    locations:{
        type:[String],
        required:true
    },
    language:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availableDates:{
        type:[Date],
        required:true
    },
    preferenceTags:{
        type:[mongoose.Types.ObjectId],
        ref:'PreferenceTag'
    },
    pickUpLocation:{
        type:String,
        required:true,
    },
    dropOffLocation:{
        type:String,
        required:true
    },
    booked:{
        type:Boolean,
        default:false,
    },
    accessibility:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number
    }
    

},{timestamps:true})
const Itinerary = mongoose.model("itinerary", itinerarySchema);
module.exports = Itinerary;





