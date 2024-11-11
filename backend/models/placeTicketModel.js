const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    place: {
        type: mongoose.Types.ObjectId,
        ref: 'place'
    },
    status: {
        type: String,
        enum: ['active', 'refunded']
    },
    receipt: {
        type: mongoose.Types.ObjectId,
        ref: 'receipt'
    },
    pointsRedeemed: {
        type: Boolean,
        default: false
    },
    ticketType: {
        type: String
    },
    amount: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

const ticketModel = mongoose.model('place ticket', ticket);
module.exports = ticketModel;