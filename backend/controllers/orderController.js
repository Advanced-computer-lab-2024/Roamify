const cartModel = require('../models/cartModel.js')
const orderModel = require('../models/orderModel.js');
const productModel = require('../models/productModel.js');
const addressModel = require('../models/addressModel.js');
const walletModel= require('../models/walletModel.js');
const receiptModel = require('../models/receiptModel');
const promoCodeModel = require('../models/promoCodeModel');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {agenda} = require('../config/agenda');

const markOrderOutForDelivery = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order
        const order = await orderModel.findById(orderId).populate('deliveryAddress');
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Allowed status transitions
        const allowedStatuses = ['Processing'];
        if (!allowedStatuses.includes(order.status)) {
            return res.status(400).json({
                message: `Order must be in "${allowedStatuses.join('" or "')}" state to mark as "Out For Delivery".`,
            });
        }

        // Update the order status
        order.status = 'Out For Delivery';
        await order.save();

        // Respond with the updated order details
        res.status(200).json({
            message: 'Order marked as out for delivery.',
            order: {
                id: order._id,
                status: order.status,
                deliveryAddress: order.deliveryAddress, // Include address details for clarity
                updatedAt: order.updatedAt, // Include update timestamp
            },
        });
    } catch (error) {
        console.error(`Failed to mark order ${req.params.orderId} as Out For Delivery:`, error.message);
        res.status(500).json({ message: 'Failed to update order status.', error: error.message });
    }
};
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order
        const order = await orderModel.findById(orderId);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Define cancellable statuses
        const cancellableStatuses = ['Pending', 'Processing'];

        if (!cancellableStatuses.includes(order.status)) {
            return res.status(400).json({ message: `Only orders with statuses ${cancellableStatuses.join(', ')} can be cancelled.` });
        }

        // Start a session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // If order is Pending or Processing, restore stock
            if (['Pending', 'Processing'].includes(order.status)) {
                const bulkOps = order.products.map((item) => ({
                    updateOne: {
                        filter: { _id: item.productId },
                        update: { $inc: { quantity: item.quantity } },
                    },
                }));
                if (bulkOps.length > 0) {
                    await productModel.bulkWrite(bulkOps, { session });
                }
            }

            // Handle Refunds if applicable
            if (['Processing'].includes(order.status) && ['Wallet', 'Stripe'].includes(order.paymentMethod)) {
                const refundAmount = order.totalAmount;

                if (order.paymentMethod === 'Wallet') {
                    const wallet = await walletModel.findOne({ tourist: req.user._id }).session(session);
                    if (!wallet) {
                        throw new Error('Wallet not found for user.');
                    }
                    wallet.availableCredit += refundAmount;
                    await wallet.save({ session });
                }

                // Create refund receipt
                const receipt = new receiptModel({
                    type: 'product',
                    status: 'successful',
                    tourist: req.user._id,
                    order: orderId,
                    price: refundAmount,
                    receiptType: 'refund',
                });
                await receipt.save({ session });
            }

            // Update order status to Cancelled
            order.status = 'Cancelled';
            await order.save({ session });

            // Remove the scheduled expiration job if it exists
            if (order.expirationJobId) {
                const job = await agenda.jobs({ _id: new mongoose.Types.ObjectId(order.expirationJobId) });
                if (job && job.length > 0) {
                    await job[0].remove();
                    console.log(`Removed expiration job ${order.expirationJobId} for order ${orderId}`);
                }
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({ message: 'Order cancelled successfully.', order });
        } catch (innerError) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Error cancelling order ${orderId}:`, innerError.message);
            throw innerError; // Let the outer catch handle the response
        }
    } catch (error) {
        console.error(`Failed to cancel order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to cancel order.', error: error.message });
    }
};
const confirmCODPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order
        const order = await orderModel.findById(orderId);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Validate order status and payment method
        if (order.status !== 'Out For Delivery' || order.paymentMethod !== 'COD') {
            return res.status(400).json({
                message: 'Order is not in a valid state for COD confirmation. Ensure it is "Out For Delivery" with payment method "COD".',
            });
        }

        // Start a session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Update order status to 'Delivered'
            order.status = 'Delivered';
            await order.save({ session });

            // Create receipt
            const receipt = new receiptModel({
                type: 'product',
                status: 'successful',
                tourist: order.tourist,
                order: orderId,
                price: order.totalAmount,
                receiptType: 'payment',
            });
            await receipt.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                message: 'COD payment confirmed. Order delivered.',
                order: {
                    id: order._id,
                    status: order.status,
                    totalAmount: order.totalAmount,
                },
                receipt: {
                    id: receipt._id,
                    price: receipt.price,
                    receiptType: receipt.receiptType,
                },
            });
        } catch (innerError) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Error confirming COD payment for order ${orderId}:`, innerError.message);
            throw innerError; // Let the outer catch handle the response
        }
    } catch (error) {
        console.error(`Failed to confirm COD payment for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to confirm COD payment.', error: error.message });
    }
};
const getUserOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

        // Validate Pagination Parameters
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
            return res.status(400).json({ message: 'Invalid pagination parameters. Page and limit must be positive integers.' });
        }

        // Fetch orders for the authenticated user with pagination and sorting
        const orders = await orderModel.find({
            tourist: req.user._id,
            status: { $ne: null }, // Exclude orders with null status
        })
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('products.productId deliveryAddress')
            .lean(); // Use lean() for faster read-only queries

        // Get total count for pagination
        const totalOrders = await orderModel.countDocuments({
            tourist: req.user._id,
            status: { $ne: null },
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        // Sanitize orders before sending to the client
        const sanitizedOrders = orders.map(order => ({
            id: order._id,
            products: order.products.map(item => ({
                productId: item.productId._id,
                name: item.productId.name, // Assuming 'name' field exists
                priceAtPurchase: item.priceAtPurchase,
                quantity: item.quantity,
            })),
            discountApplied: order.discountApplied,
            totalAmount: order.totalAmount,
            status: order.status,
            paymentMethod: order.paymentMethod,
            deliveryAddress: order.deliveryAddress, // Ensure this is sanitized as needed
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));

        res.status(200).json({
            message: 'Orders retrieved successfully.',
            orders: sanitizedOrders,
            pagination: {
                totalOrders,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalOrders / limitNumber),
            },
        });
    } catch (error) {
        console.error(`Failed to retrieve orders for user ${req.user._id}:`, error.message);
        res.status(500).json({ message: 'Failed to retrieve orders.', error: error.message });
    }
};
const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order and ensure it belongs to the authenticated user
        const order = await orderModel.findOne({
            _id: orderId,
            tourist: req.user._id,
        }).populate('products.productId deliveryAddress');

        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Sanitize order details
        const sanitizedOrder = {
            id: order._id,
            products: order.products.map(item => ({
                productId: item.productId._id,
                name: item.productId.name, // Assuming 'name' field exists
                priceAtPurchase: item.priceAtPurchase,
                quantity: item.quantity,
            })),
            discountApplied: order.discountApplied,
            totalAmount: order.totalAmount,
            status: order.status,
            paymentMethod: order.paymentMethod,
            deliveryAddress: order.deliveryAddress, // Ensure delivery address is sanitized
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };

        res.status(200).json({ message: 'Order details retrieved successfully.', order: sanitizedOrder });
    } catch (error) {
        console.error(`Failed to retrieve details for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to retrieve order details.', error: error.message });
    }
};
const updateOrderAddress = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { orderId, addressId } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Validate Address ID
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: 'Invalid Address ID.' });
        }

        // Fetch the order with session
        const order = await orderModel.findById(orderId).session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Define statuses that allow address updates
        const modifiableStatuses = ['Pending']; // Adjust based on business logic

        if (!modifiableStatuses.includes(order.status)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: `Cannot update address for orders with status "${order.status}".` });
        }

        // Fetch the new address with session
        const address = await addressModel.findById(addressId).session(session);
        if (!address || address.user.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Address not found or not authorized.' });
        }

        // Update the delivery address
        order.deliveryAddress = addressId;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Sanitize the order data before sending
        const sanitizedOrder = {
            id: order._id,
            deliveryAddress: order.deliveryAddress,
            status: order.status,
            totalAmount: order.totalAmount,
            // Add other non-sensitive fields as needed
        };

        res.status(200).json({ message: 'Delivery address updated successfully.', order: sanitizedOrder });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Failed to update address for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to update address.', error: error.message });
    }
};
const applyPromoCodeToOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { orderId, promoCode } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Find the order with session
        const order = await orderModel.findById(orderId).populate('products.productId').session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Validate order status
        if (order.status !== 'Pending') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Promo code can only be applied or removed from pending orders.' });
        }

        const originalAmount = order.products.reduce(
            (sum, item) => sum + (item.priceAtPurchase * item.quantity),
            0
        );

        if (promoCode === 'none') {
            // Remove the existing promo code
            order.promoCode = null;
            order.discountApplied = 0; // Reset discount
            order.totalAmount = originalAmount; // Reset to original amount
            await order.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                message: 'Promo code removed successfully.',
                order: {
                    id: order._id,
                    discountApplied: order.discountApplied,
                    totalAmount: order.totalAmount,
                    status: order.status,
                }
            });
        }

        // Apply the new promo code
        const code = await promoCodeModel.findOne({ code: promoCode, isActive: true }).session(session);
        if (!code) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Promo code not found or inactive.' });
        }

        if (new Date() > code.expiryDate) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Promo code has expired.' });
        }

        // Check if promo code has uses left, if applicable
        if (code.usesLeft !== null && code.usesLeft <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Promo code has no uses left.' });
        }

        // Calculate discount
        const discount = (originalAmount * code.discountPercentage) / 100;
        const discountedAmount = originalAmount - discount;

        // Update the order with the promo code
        order.promoCode = promoCode;
        order.totalAmount = discountedAmount;
        order.discountApplied = discount;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: 'Promo code applied successfully.',
            originalAmount,
            discount,
            discountedAmount,
            order: {
                id: order._id,
                promoCode: order.promoCode,
                status: order.status,
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Failed to apply or remove promo code for order ${req.params.orderId}:`, error.message);
        return res.status(500).json({ message: 'Failed to apply or remove promo code.', error: error.message });
    }
};
const processPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { orderId } = req.params;
        const { paymentMethod, paymentMethodId } = req.body;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order with session
        const order = await orderModel.findById(orderId).populate('products.productId').session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Validate essential details
        if (!order.deliveryAddress) {
            return res.status(400).json({ message: 'Delivery address is required to process payment.' });
        }

        if (order.products.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one product to process payment.' });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order must be in "Pending" state to process payment.' });
        }

        let paymentSuccessful = false;

        // Handle Wallet Payment
        if (paymentMethod === 'Wallet') {
            const wallet = await walletModel.findOne({ tourist: req.user._id }).session(session);
            if (!wallet || wallet.availableCredit < order.totalAmount) {
                return res.status(400).json({ message: 'Insufficient wallet balance.' });
            }
            wallet.availableCredit -= order.totalAmount;
            await wallet.save({ session });
            paymentSuccessful = true;

            // Handle Stripe Payment
        } else if (paymentMethod === 'Stripe') {
            if (!paymentMethodId) {
                return res.status(400).json({ message: 'Payment method ID is required for Stripe payments.' });
            }

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(order.totalAmount * 100), // Amount in cents
                    currency: 'usd',
                    payment_method: paymentMethodId,
                    confirm: true,
                });

                if (paymentIntent.status !== 'succeeded') {
                    return res.status(400).json({ message: 'Stripe payment failed.' });
                }

                paymentSuccessful = true;
            } catch (stripeError) {
                console.error(`Stripe payment error for order ${orderId}:`, stripeError.message);
                return res.status(400).json({ message: 'Stripe payment failed.', error: stripeError.message });
            }

            // Handle Invalid Payment Method
        } else if (paymentMethod === 'COD') {
            return res.status(400).json({ message: 'COD does not require payment processing here.' });
        } else {
            return res.status(400).json({ message: 'Invalid payment method.' });
        }

        if (!paymentSuccessful) {
            return res.status(400).json({ message: 'Payment was not successful.' });
        }

        // Handle Promo Code Usage
        if (order.promoCode) {
            const code = await promoCodeModel.findOne({ code: order.promoCode }).session(session);
            if (code) {
                // Check if promo code is expired
                if (new Date() > code.expiryDate) {
                    return res.status(400).json({ message: 'Promo code has expired.' });
                }

                // Check if promo code has uses left
                if (code.usesLeft !== null && code.usesLeft <= 0) {
                    return res.status(400).json({ message: 'Promo code has no uses left.' });
                }

                // Decrement uses upon successful payment
                if (code.usesLeft !== null) {
                    code.usesLeft -= 1;
                    if (code.usesLeft === 0) {
                        code.isActive = false;
                    }
                }
                await code.save({ session }); // Save promo code with session
            }
        }

        // Update order status and payment method
        order.status = 'Processing';
        order.paymentMethod = paymentMethod;
        await order.save({ session });

        // Delete the user's cart
        await cartModel.findOneAndDelete({ tourist: req.user._id }).session(session);

        await session.commitTransaction();
        session.endSession();

        // Sanitize the order data before sending
        const sanitizedOrder = {
            id: order._id,
            status: order.status,
            paymentMethod: order.paymentMethod,
            totalAmount: order.totalAmount,
        };

        res.status(200).json({ message: 'Payment successful. Order is now processing.', order: sanitizedOrder });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Failed to process payment for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to process payment.', error: error.message });
    }
};


module.exports = {
    updateOrderAddress,
    processPayment,
    confirmCODPayment,
    markOrderOutForDelivery,
    getUserOrders,
    getOrderDetails,
    cancelOrder,
    applyPromoCodeToOrder
};