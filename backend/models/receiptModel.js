const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['activity', 'itinerary', 'product', 'transportation', 'place', 'points redemption'],
        required: true
    },
    status: {
        type: String,
        enum: ['failed', 'successful', 'pending'],
        required: true
    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: 'order',
        required: false  // Optional, as not all receipts might be linked to an order
    },
    itinerary: {
        type: mongoose.Types.ObjectId,
        ref: 'order',
        required: false  // Optional, as not all receipts might be linked to an order
    },
    activity: {
        type: mongoose.Types.ObjectId,
        ref: 'order',
        required: false  // Optional, as not all receipts might be linked to an order
    },
    price: {
        type: Number,
        required: true  // Represents the final charged price after discounts
    },
    receiptType: {
        type: String,
        enum: ['payment', 'refund'],
        required: true
    },
    promoCode: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Receipt = mongoose.model('receipt', receiptSchema);
module.exports = Receipt;
