const cartModel = require('../models/cartModel.js')
const orderModel = require('../models/orderModel.js');
const productModel = require('../models/productModel.js');
const addressModel = require('../models/addressModel.js');
const userModel = require('../models/userModel.js');

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
        const { orderId, paymentMethod } = req.body;

        // Find the order
        const order = await orderModel.findById(orderId).populate('products.productId');
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Check order status
        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order is not in a valid state for payment.' });
        }

        // Handle payment
        if (paymentMethod === 'Wallet') {
            const user = await userModel.findById(req.user._id);
            if (user.wallet < order.totalAmount) {
                return res.status(400).json({ message: 'Insufficient wallet balance.' });
            }
            user.wallet -= order.totalAmount;
            await user.save();
        } else if (paymentMethod === 'Stripe') {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: transportation.price * 100,
                currency: 'usd',
                payment_method: req.body.paymentMethodId,
                confirm: true,
                return_url: 'https://yourfrontendurl.com/payment-success', // Replace with your frontend success page
            });
        }
        else if (paymentMethod === 'COD')
        {}
        else {
            return res.status(400).json({ message: 'Invalid payment method.' });
        }

        // Update order status
        order.status = 'Successful';
        order.paymentMethod = paymentMethod;
        await order.save();

        // Create a receipt
        const receipt = new receiptModel({
            type: 'product',
            status: 'successful',
            tourist: req.user._id,
            price: order.totalAmount,
            receiptType: 'payment'
        });
        await receipt.save();

        // Clear cart after successful payment
        await cartModel.findOneAndDelete({ tourist: req.user._id });

        res.status(200).json({
            message: 'Payment successful. Receipt generated.',
            order,
            receipt
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process payment.', error: error.message });
    }
};

module.exports = {
    expireOrder,
    updateOrderAddress,
    processPayment
};