const mongoose = require('mongoose');
const { stringify } = require('querystring');

const ticket = new mongoose.Schema({
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    activity: {
        type: mongoose.Types.ObjectId,
        ref: 'activity'
    },
    status: {
        type: String,
        enum: ['active', 'refunded']
    },
    receipt: {
        type: mongoose.Types.ObjectId,
        ref: 'receipt'
    },
    date: {
        type: Date
    },
    pointsRedeemed: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    locationName: {
        type: String
    },
    time: {
        type: String
    },
    originalPrice: {
        type: Number
    }
}, { timestamps: true })

const ticketModel = mongoose.model('activity ticket', ticket);
module.exports = ticketModel;