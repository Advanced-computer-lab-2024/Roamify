const cartModel = require('../models/cartModel.js')
const orderModel = require('../models/orderModel.js');
const productModel = require('../models/productModel.js');
const addressModel = require('../models/addressModel.js');
const userModel = require('../models/userModel.js');
const receiptModel = require('../models/receiptModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const expireOrder = async (orderId) => {
    try {
        const order = await orderModel.findById(orderId);

        if (order && order.status === 'Pending') {
            // Unlock quantities
            for (const item of order.products) {
                await productModel.findByIdAndUpdate(item.productId, { $inc: { quantity: item.quantity } });
            }

            // Mark the order as expired
            order.status = 'Expired';
            await order.save();
        }
    } catch (error) {
        console.error(`Failed to expire order ${orderId}:`, error.message);
    }
};
const updateOrderAddress = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { addressId } = req.params;

        const order = await orderModel.findById(orderId);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        const address = await addressModel.findById(addressId);
        if (!address || address.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Address not found or not authorized.' });
        }

        order.deliveryAddress = addressId;
        await order.save();

        res.status(200).json({ message: 'Delivery address updated successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update address.', error: error.message });
    }
};
const processPayment = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentMethod, paymentMethodId } = req.body;

        const order = await orderModel.findById(orderId).populate('products.productId');
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order is not in a valid state for payment.' });
        }

        if (paymentMethod === 'Wallet') {
            const user = await userModel.findById(req.user._id);
            if (user.wallet < order.totalAmount) {
                return res.status(400).json({ message: 'Insufficient wallet balance.' });
            }
            user.wallet -= order.totalAmount;
            await user.save();
        } else if (paymentMethod === 'Stripe') {
            if (!paymentMethodId) {
                return res.status(400).json({ message: 'Payment method ID is required for Stripe payments.' });
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: order.totalAmount * 100,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
            });
            if (paymentIntent.status !== 'succeeded') {
                return res.status(400).json({ message: 'Stripe payment failed.' });
            }
        } else if (paymentMethod !== 'COD') {
            return res.status(400).json({ message: 'Invalid payment method.' });
        }

        // Update order status
        order.status = 'Processing';
        order.paymentMethod = paymentMethod;
        await order.save();

        // Create receipt only for Wallet and Stripe
        if (paymentMethod !== 'COD') {
            const receipt = new receiptModel({
                type: 'product',
                status: 'successful',
                tourist: req.user._id,
                order: orderId,
                price: order.totalAmount,
                receiptType: 'payment',
            });
            await receipt.save();
        }

        // Clear cart
        await cartModel.findOneAndDelete({ tourist: req.user._id });

        res.status(200).json({ message: 'Payment processed successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process payment.', error: error.message });
    }
};
const markOrderOutForDelivery = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findById(orderId);
        if (!order || order.status !== 'Processing') {
            return res.status(400).json({ message: 'Order is not in a valid state for delivery.' });
        }

        order.status = 'Out For Delivery';
        await order.save();

        res.status(200).json({ message: 'Order marked as out for delivery.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status.', error: error.message });
    }
};
const confirmCODPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findById(orderId);
        if (!order || order.status !== 'Out For Delivery') {
            return res.status(400).json({ message: 'Order is not in a valid state for COD confirmation.' });
        }

        order.status = 'Delivered';
        await order.save();

        const receipt = new receiptModel({
            type: 'product',
            status: 'successful',
            tourist: order.tourist,
            order: orderId,
            price: order.totalAmount,
            receiptType: 'payment',
        });
        await receipt.save();

        res.status(200).json({ message: 'COD payment confirmed. Order delivered.', order, receipt });
    } catch (error) {
        res.status(500).json({ message: 'Failed to confirm COD payment.', error: error.message });
    }
};

module.exports = {
    expireOrder,
    updateOrderAddress,
    processPayment,
    confirmCODPayment,
    markOrderOutForDelivery
};