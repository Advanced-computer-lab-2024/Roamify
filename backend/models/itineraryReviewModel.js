const mongoose = require('mongoose');

const itineraryReviewSchema = new mongoose.Schema({
    itinerary: {
        type: mongoose.Types.ObjectId,
        ref: 'itinerary',
        required: true,
    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('itinerary review', itineraryReviewSchema);
