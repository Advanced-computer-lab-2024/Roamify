const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },
    userName: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactivated', 'pending'],
        default: 'pending'
    },
    role: {
        type: String,
        enum: ['advertiser', 'seller', 'tour guide'],
    }



});
const sellerModel = mongoose.Model('seller', sellerSchema);
module.exports = sellerModel;