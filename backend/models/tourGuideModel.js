const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    previousWork: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated', 'pending'],
        default: 'pending'
    },
});
const tourGuideModel = mongoose.Model('tourGuide', tourGuideSchema);
module.exports = tourGuideModel;