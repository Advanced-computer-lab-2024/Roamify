const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        latitude: {  // Correct the typo here
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tagPlace: {
        type: String // Ensure this field is present
    },
    advertiserId: {
        type: String
    },
    rating: {
        type: Number
    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
