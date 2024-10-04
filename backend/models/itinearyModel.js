const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({

    activities: {
        type: [String],
    },
    locations: {
        type: [String]
    },
    timeline: {
        type: String
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                // Validate time in "HH:MM" format using regex
                return v >= 0.5;
            },
            message: props => `${props.value} is not a valid time format! (Expected: HH:MM)`
        },
    },
    language: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableDates: {
        type: [Date]
    },
    accessibility: {
        type: String,
        enum: ['WheelChair', 'None'],
        required: true,
        default: 'None'
    },
    pickUp: {
        //google maps api
    },
    dropOff: {
        //google maps api
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: false
    }

}, { timestamps: true });

const itinearyModel = mongoose.model('itineary', itinerarySchema);
module.exports = itinearyModel;



