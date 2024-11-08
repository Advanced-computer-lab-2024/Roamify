const mongoose = require('mongoose');

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
    pointsRedeemed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const ticketModel = mongoose.model('activityTicket', ticket);
module.exports = ticketModel;