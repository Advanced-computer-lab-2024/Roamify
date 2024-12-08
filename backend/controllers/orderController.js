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
            const cancellableStatuses = ['Processing'];
            if (!cancellableStatuses.includes(order.status)) {
                return res.status(400).json({ message: `Only orders with statuses ${cancellableStatuses.join(', ')} can be cancelled.` });
            }

            // Start a session for transaction
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                // Restore stock if order is Pending or Processing
                const bulkOps = order.products.map((item) => ({
                    updateOne: {
                        filter: { _id: item.productId },
                        update: { $inc: { quantity: item.quantity } },
                    },
                }));
                await productModel.bulkWrite(bulkOps, { session });

                // Refund if necessary and create receipt if order is Processing and not COD
                if (order.status === 'Processing' && order.paymentMethod !== 'COD') {
                    const refundAmount = order.products.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);

                    await walletModel.updateOne(
                        { tourist: req.user._id },
                        { $inc: { availableCredit: refundAmount } },
                        { session }
                    );

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

                await session.commitTransaction();
                session.endSession();

                res.status(200).json({ message: 'Order cancelled successfully.', order });
            } catch (innerError) {
                await session.abortTransaction();
                session.endSession();
                console.error(`Error cancelling order ${orderId}:`, innerError.message);
                res.status(500).json({ message: 'Failed to cancel and refund order.', error: innerError.message });
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
            return res.status(400).json({ message: 'Invalid Order ID provided.' });
        }

        // Fetch the order and its associated receipt
        const order = await orderModel.findById(orderId).populate('receipt');
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        if (order.tourist.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this order.' });
        }

        // Validate order status and payment method
        if (order.status !== 'Out For Delivery' || order.paymentMethod !== 'COD') {
            return res.status(400).json({
                message: 'Order must be "Out For Delivery" and the payment method must be "COD" to confirm payment.',
            });
        }

        // Start a session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Update order status to 'Delivered'
            order.status = 'Delivered';
            await order.save({ session });

            // Correctly update the existing receipt if it exists
            if (order.receipt) {
                await receiptModel.updateOne(
                    { _id: order.receipt._id },
                    { status: 'successful' }, // Update the status to 'successful'
                    { session }
                );
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                message: 'COD payment confirmed, order delivered.',
                order: {
                    id: order._id,
                    status: order.status,
                },
                receipt: order.receipt ? {
                    id: order.receipt._id,
                    price: order.receipt.price,
                    receiptType: order.receipt.receiptType,
                } : null,
            });
        } catch (innerError) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Error confirming COD payment for order ${orderId}:`, innerError.message);
            res.status(500).json({ message: 'Error confirming COD payment.', error: innerError.message });
        }
    } catch (error) {
        console.error(`Failed to confirm COD payment for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Error processing request.', error: error.message });
    }
};
const getUserOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ message: 'Page and limit must be positive integers.' });
        }

        const filteredStatuses = ['Processing', 'Delivered', 'Cancelled', 'Refunded'];

        const orders = await orderModel.find({
            tourist: req.user._id,
            status: { $in: filteredStatuses }
        })
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('products.productId', 'name price')  // Select fields as necessary for your product model
            .populate('deliveryAddress', 'street city')  // Only necessary fields from the address
            .populate('receipt') // Correct population assuming the reference is set correctly in the Order schema
            .lean();

        const totalOrders = await orderModel.countDocuments({
            tourist: req.user._id,
            status: { $in: filteredStatuses }
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        const sanitizedOrders = orders.map(order => ({
            id: order._id,
            products: order.products.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                priceAtPurchase: item.priceAtPurchase,
                quantity: item.quantity,
            })),
            status: order.status,
            paymentMethod: order.paymentMethod,
            deliveryAddress: {
                street: order.deliveryAddress.street,
                city: order.deliveryAddress.city,
            },
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            receipt: order.receipt ? {
                id: order.receipt._id,
                status: order.receipt.status,
                price: order.receipt.price,
                receiptType: order.receipt.receiptType
            } : null,
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
        console.error(`Failed to retrieve orders for user ${req.user._id}:`, error);
        res.status(500).json({ message: 'Failed to retrieve orders.', error: error.toString() });
    }
};
const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        const order = await orderModel.findOne({
            _id: orderId,
            tourist: req.user._id,
        })
            .populate('products.productId', 'name price')
            .populate('deliveryAddress')
            .populate('receipt') // Ensure this is correct based on your schema references
            .exec();

        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        const orderDetails = {
            id: order._id,
            products: order.products.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                priceAtPurchase: item.priceAtPurchase,
                quantity: item.quantity,
            })),
            status: order.status,
            paymentMethod: order.paymentMethod,
            deliveryAddress: {
                street: order.deliveryAddress.street,
                city: order.deliveryAddress.city,
                postalCode: order.deliveryAddress.postalCode,
            },
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            receipt: order.receipt ? {
                id: order.receipt._id,
                status: order.receipt.status,
                price: order.receipt.price,
                receiptType: order.receipt.receiptType
            } : null
        };

        res.status(200).json({ message: 'Order details retrieved successfully.', order: orderDetails });
    } catch (error) {
        console.error(`Failed to retrieve details for order ${orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to retrieve order details.', error: error.message });
    }
};
const updateOrderAddress = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { orderId, addressId } = req.params;

        // Validate Order ID and Address ID
        if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(addressId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid Order ID or Address ID.' });
        }

        // Fetch the order and ensure it belongs to the authenticated user
        const order = await orderModel.findById(orderId).session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        // Check if the order status allows for address update
        const modifiableStatuses = ['Pending'];  // Typically, address can only be changed if the order is still pending
        if (!modifiableStatuses.includes(order.status)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: `Cannot update address for orders with status "${order.status}".` });
        }

        // Fetch the new address and ensure it belongs to the user
        const address = await addressModel.findById(addressId).session(session);
        if (!address || address.user.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Address not found or not authorized.' });
        }

        // Update the delivery address in the order
        order.deliveryAddress = address._id;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Respond with the updated order details
        res.status(200).json({
            message: 'Delivery address updated successfully.',
            order: {
                id: order._id,
                deliveryAddress: {
                    street: address.street,
                    city: address.city,
                    postalCode: address.postalCode
                },
                status: order.status
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Failed to update address for order ${req.params.orderId}:`, error.message);
        res.status(500).json({ message: 'Failed to update address.', error: error.message });
    }
};
const applyPromoCodeToOrder = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { orderId, promoCode } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order and populate its receipt
        const order = await orderModel.findById(orderId).populate('receipt').session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        if (order.status !== 'Pending') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Promo codes can only be applied to pending orders.' });
        }

        // Validate if the receipt exists
        if (!order.receipt) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'No receipt associated with this order.' });
        }

        const receipt = order.receipt;

        if (promoCode === 'none') {
            // Ensure a promo code is currently applied before removing it
            if (!receipt.promoCode) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: 'No promo code is currently applied to this order.' });
            }

            // Calculate the total price of products at the time of purchase
            const originalAmount = order.products.reduce(
                (sum, item) => sum + (item.priceAtPurchase * item.quantity),
                0
            );

            // Remove promo code and reset discount in the receipt
            receipt.promoCode = null;
            receipt.price = originalAmount; // Reset to the original calculated price
            await receipt.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: 'Promo code removed successfully.',
                receipt: {
                    id: receipt._id,
                    promoCode: receipt.promoCode,
                    price: receipt.price,
                    status: receipt.status,
                },
            });
        }

        // Ensure no promo code is currently applied before applying a new one
        if (receipt.promoCode) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'A promo code is already applied to this order.' });
        }

        // Validate promo code
        const code = await promoCodeModel.findOne({ code: promoCode, isActive: true }).session(session);
        if (!code || new Date() > code.expiryDate || (code.usesLeft !== null && code.usesLeft <= 0)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Promo code not valid or expired.' });
        }

        // Calculate the total price of products and apply the discount
        const originalAmount = receipt.price;
        const discount = (originalAmount * code.discountPercentage) / 100;
        const discountedAmount = originalAmount - discount;

        // Update the receipt with the promo code details
        receipt.promoCode = promoCode;
        receipt.price = discountedAmount; // Update the price in the receipt
        await receipt.save({ session });

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message: 'Promo code applied successfully.',
            receipt: {
                id: receipt._id,
                promoCode: receipt.promoCode,
                price: receipt.price,
                status: receipt.status,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Failed to apply or remove promo code:`, error.message);
        return res.status(500).json({ message: 'Failed to apply or remove promo code.', error: error.message });
    }
};
const processPayment = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { orderId } = req.params;
        const { paymentMethod, paymentMethodId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid Order ID.' });
        }

        // Fetch the order and populate its receipt
        const order = await orderModel.findById(orderId).populate('receipt').session(session);
        if (!order || order.tourist.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found or not authorized.' });
        }

        if (order.status !== 'Pending') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Order must be in "Pending" state to process payment.' });
        }

        // Validate delivery address
        if (!order.deliveryAddress) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'A valid delivery address is required to process payment.' });
        }

        const receipt = order.receipt; // Guaranteed to exist
        const paymentAmount = receipt.price; // Use price from receipt

        let paymentSuccessful = false;

        // Handle Wallet Payment
        if (paymentMethod === 'Wallet') {
            const wallet = await walletModel.findOne({ tourist: req.user._id }).session(session);
            if (!wallet || wallet.availableCredit < paymentAmount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: 'Insufficient wallet balance.' });
            }

            wallet.availableCredit -= paymentAmount;
            await wallet.save({ session });
            paymentSuccessful = true;

            // Handle Stripe Payment
        } else if (paymentMethod === 'Stripe') {
            if (!paymentMethodId) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: 'Payment method ID is required for Stripe payments.' });
            }

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(paymentAmount * 100), // Amount in cents
                    currency: 'usd',
                    payment_method: paymentMethodId,
                    confirm: true,
                });

                if (paymentIntent.status === 'succeeded') {
                    paymentSuccessful = true;
                } else {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(400).json({
                        message: 'Stripe payment failed.',
                        error: paymentIntent.last_payment_error?.message || 'Unknown error',
                    });
                }
            } catch (stripeError) {
                await session.abortTransaction();
                session.endSession();
                console.error(`Stripe payment error for order ${orderId}:`, stripeError.message);
                return res.status(400).json({ message: 'Stripe payment failed.', error: stripeError.message });
            }

            // Handle COD
        } else if (paymentMethod === 'COD') {
            // Leave the receipt status as 'pending' for COD
            receipt.status = 'pending';
            paymentSuccessful = true;

        } else {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid payment method.' });
        }

        if (paymentSuccessful) {
            // Update receipt for non-COD payments
            if (paymentMethod !== 'COD') {
                receipt.status = 'successful';
            }

            await receipt.save({ session });

            // Decrement promo code usage if applicable
            if (receipt.promoCode) {
                const promoCode = await promoCodeModel.findOne({ code: receipt.promoCode }).session(session);
                if (promoCode) {
                    if (promoCode.usesLeft !== null) {
                        if (promoCode.usesLeft > 0) {
                            promoCode.usesLeft -= 1;
                            if (promoCode.usesLeft === 0) {
                                promoCode.isActive = false;
                            }
                        } else {
                            await session.abortTransaction();
                            session.endSession();
                            return res.status(400).json({ message: 'Promo code is no longer valid for use.' });
                        }
                    }
                    await promoCode.save({ session });
                }
            }

            // Update order details
            order.status = 'Processing';
            order.paymentMethod = paymentMethod;
            await order.save({ session });

            // Clear the user's cart
            await cartModel.findOneAndDelete({ tourist: req.user._id }).session(session);

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                message: 'Payment successful. Order is now processing.',
                order: {
                    id: order._id,
                    status: order.status,
                },
                receipt: {
                    id: receipt._id,
                    price: receipt.price,
                    receiptType: receipt.receiptType,
                },
            });
        } else {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Payment was not successful.' });
        }
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        console.error(`Failed to process payment for order ${req.params.orderId}:`, error.message);
        return res.status(500).json({ message: 'Failed to process payment.', error: error.message });
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