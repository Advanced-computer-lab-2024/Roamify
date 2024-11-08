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
    date: {
        type: Date
    },
    receipt: {
        type: mongoose.Types.ObjectId,
        ref: 'receipt'
    }
}, { timestamps: true })

const ticketModel = mongoose.model('activityTicket', ticket);
module.exports = ticketModel;