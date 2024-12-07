const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tourist: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Expired', 'Refunded', 'Out For Delivery', 'Delivered', 'Cancelled', 'Processing'],
        default: 'Pending',
    },
    paymentMethod: { type: String, enum: ['Wallet', 'Stripe', 'COD'], default: null },
    deliveryAddress: { type: mongoose.Types.ObjectId, ref: 'address', required: false }
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
