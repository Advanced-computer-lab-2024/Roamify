const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['activity', 'itinerary', 'product', 'transportation']
    },
    status: {
        type: String,
        enum: ['failed', 'successfull']
    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    price: {
        type: Number
    }
}, { timestamps: true })

const receiptModel = mongoose.model('receipt', receiptSchema);
module.exports = receiptModel; 