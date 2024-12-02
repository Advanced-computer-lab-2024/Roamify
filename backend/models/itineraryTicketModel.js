const mongoose = require('mongoose');

const ticket = new mongoose.Schema({
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    itinerary: {
        type: mongoose.Types.ObjectId,
        ref: 'itinerary'
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
        type: String
    },
    locations: {
        type: [String]
    }
}, { timestamps: true })

const ticketModel = mongoose.model('itinerary ticket', ticket);
module.exports = ticketModel;