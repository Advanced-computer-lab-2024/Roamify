const mongoose = require('mongoose');

const activityReviewSchema = new mongoose.Schema({
    activity: {
        type: mongoose.Types.ObjectId,
        ref: 'activity',
        required: true,
    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('activity review', activityReviewSchema);
