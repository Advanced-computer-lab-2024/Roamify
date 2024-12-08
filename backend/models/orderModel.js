const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tourist: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
            priceAtPurchase: { type: Number, required: true }, // Capture the price at the time of order
            quantity: { type: Number, required: true },
        }
    ],
    discountApplied: { type: Number, default: 0 }, // Total discount applied to the order
    totalAmount: { type: Number, required: true }, // Final amount after discount
    promoCode: { type: String, default: null }, // Promo code applied to the order
    status: { type: String, enum: ['Pending', 'Processing', 'Delivered', 'Cancelled', 'Refunded', 'Expired'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Wallet', 'Stripe', 'COD'], default: null },
    deliveryAddress: { type: mongoose.Types.ObjectId, ref: 'address' },
    expirationJobId: { type: String, default: null }, // Store Bull Job ID
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
