const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tourist: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
            priceAtPurchase: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    status: { type: String, enum: ['Pending', 'Processing', 'Delivered', 'Cancelled', 'Refunded'], default: 'Pending' },
    deliveryAddress: { type: mongoose.Types.ObjectId, ref: 'address' },
    receipt: { type: mongoose.Types.ObjectId, ref: 'receipt', required: false },
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
