const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
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
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    websiteLink: {
        type: String,
        required: true
    },
    hotline: {
        type: Number,
        required: true
    },
    companyProfile: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated', 'pending'],
        default: 'pending'
    },
});
const advertiserModel = mongoose.Model('advertiser', advertiserSchema);
module.exports = advertiserModel;