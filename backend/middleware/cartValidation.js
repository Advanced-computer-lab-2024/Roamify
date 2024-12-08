const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const {agenda} = require("../config/agenda");
const mongoose = require("mongoose");
const receiptModel = require("../models/receiptModel")
;
const cancelPendingOrderAndRestoreStock = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Find the pending order for the user
        const pendingOrder = await orderModel.findOne({ tourist: req.user._id, status: "Pending" }).populate('receipt').session(session);
        if (!pendingOrder) {
            session.endSession();
            return next(); // Proceed if no pending order exists
        }

        // Prepare bulk operations to restore stock
        const bulkOps = pendingOrder.products.map((item) => ({
            updateOne: {
                filter: { _id: item.productId },
                update: { $inc: { quantity: item.quantity } }, // Increment stock back
            },
        }));

        // Execute bulk operations to restore stock
        if (bulkOps.length > 0) {
            await productModel.bulkWrite(bulkOps, { session });
            console.log("Stock restored for pending order.");
        }

        // Delete the receipt if it exists
        if (pendingOrder.receipt) {
            await receiptModel.findByIdAndDelete(pendingOrder.receipt._id).session(session);
            console.log("Corresponding receipt deleted.");
        }

        // Delete the pending order
        await orderModel.findByIdAndDelete(pendingOrder._id).session(session);
        console.log("Pending order deleted.");

        await session.commitTransaction();
        session.endSession();
        next(); // Proceed to the next middleware
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        console.error(`Error canceling pending order: ${error.message}`);
        res.status(500).json({ message: "Failed to cancel pending order and restore stock.", error: error.message });
    }
};
const validateAndCleanCart = async (req, res, next) => {
    try {
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate("products.productId");
        if (!cart) return next();

        let messages = []; // Array to collect user notifications

        // Iterate through the products to validate and clean
        const updatedProducts = await Promise.all(
            cart.products.map(async (item) => {
                const product = await productModel.findById(item.productId._id);

                if (!product || product.isArchived) {
                    // Product is archived or does not exist; remove it
                    messages.push(`Product "${item.productId.name}" was removed because it is no longer available.`);
                    return null; // Mark for removal
                } else if (product.quantity < item.quantity) {
                    // Insufficient stock; adjust quantity
                    if (product.quantity > 0) {
                        messages.push(
                            `The quantity of "${product.name}" in your cart was adjusted to ${product.quantity} due to limited stock.`
                        );
                        item.quantity = product.quantity; // Adjust to available stock
                        return item; // Keep the item with adjusted quantity
                    } else {
                        // Out of stock, remove from cart
                        messages.push(`Product "${product.name}" was removed because it is out of stock.`);
                        return null; // Mark for removal
                    }
                } else {
                    // Product is valid and has sufficient stock
                    return item;
                }
            })
        );

        // Filter out null items (archived, out of stock, or invalid products)
        cart.products = updatedProducts.filter((item) => item !== null);

        await cart.save();

        if (messages.length > 0) {
            // Send response with the messages if any changes were made
            return res.status(200).json({
                message: "Your cart has been updated.",
                notifications: messages,
                cart: cart.products.map((item) => ({
                    productId: item.productId._id,
                    name: item.productId.name,
                    quantity: item.quantity,
                    price: item.productId.price,
                })),
            });
        }

        // Proceed if no changes were necessary
        next();
    } catch (error) {
        console.error(`Error validating and cleaning cart: ${error.message}`);
        res.status(500).json({ message: "Failed to validate and clean cart.", error: error.message });
    }
};

module.exports = {
    validateAndCleanCart,
    cancelPendingOrderAndRestoreStock,
};


