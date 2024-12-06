const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['activity', 'itinerary', 'product', 'transportation', 'place', 'points redemption']
    },
    status: {
        type: String,
        enum: ['failed', 'successful']
    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: 'order'
    },
    price: {
        type: Number
    },
    receiptType: {
        type: String,
        enum: ['payment', 'refund']
    }
}, { timestamps: true });

const receiptModel = mongoose.model('receipt', receiptSchema);
module.exports = receiptModel;
