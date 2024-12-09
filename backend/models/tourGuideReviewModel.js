const mongoose = require('mongoose');

const tourGuideReviewSchema = new mongoose.Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tourGuide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 500
    }
}, { timestamps: true });

module.exports = mongoose.model('tour guide review', tourGuideReviewSchema);
