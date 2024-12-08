const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const receiptModel = require("../models/receiptModel");
const {agenda} = require("../config/agenda");
const mongoose = require("mongoose");

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate("products.productId");
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ message: "Cart is empty or contains invalid products." });
        }

        const cartDetails = cart.products.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.picture?.[0]?.url || null,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        res.status(200).json({ message: "Cart retrieved successfully.", cart: cartDetails });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve cart.", error: error.message });
    }
};
const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive integer." });
        }

        const product = await productModel.findById(productId);
        if (!product || product.isArchived || product.quantity < quantity) {
            return res.status(400).json({
                message: `Product unavailable or insufficient stock. Available: ${product?.quantity || 0}`,
            });
        }

        let cart = await cartModel.findOne({ tourist: req.user._id });
        if (!cart) {
            cart = new cartModel({ tourist: req.user._id, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((p) => p.productId.equals(productId));
        if (existingProductIndex !== -1) {
            const existingProduct = cart.products[existingProductIndex];
            const newTotalQuantity = existingProduct.quantity + quantity;
            if (newTotalQuantity > product.quantity) {
                return res.status(400).json({
                    message: `Cannot add more. Only ${product.quantity} units left in stock.`,
                });
            }
            cart.products[existingProductIndex].quantity = newTotalQuantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product to cart.", error: error.message });
    }
};
const incrementProductInCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await productModel.findById(productId);
        if (!product || product.isArchived) {
            return res.status(404).json({ message: "Product not found or unavailable." });
        }

        const cart = await cartModel.findOne({ tourist: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const productInCart = cart.products.find((item) => item.productId.equals(productId));
        if (!productInCart) {
            return res.status(400).json({ message: "Product not found in the cart." });
        }

        if (productInCart.quantity + 1 > product.quantity) {
            return res.status(400).json({
                message: `Only ${product.quantity} units available. You already have ${productInCart.quantity} in your cart.`,
            });
        }

        productInCart.quantity += 1;
        await cart.save();

        res.status(200).json({ message: "Product quantity incremented successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to increment product quantity.", error: error.message });
    }
};
const decrementProductInCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        const cart = await cartModel.findOne({ tourist: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(400).json({ message: "Product not found in the cart." });
        }

        const productInCart = cart.products[productIndex];

        if (productInCart.quantity === 1) {
            cart.products.splice(productIndex, 1);
        } else {
            productInCart.quantity -= 1;
        }

        await cart.save();
        res.status(200).json({ message: "Product quantity decremented successfully.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to decrement product quantity.", error: error.message });
    }
};
const removeProductFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;

        const cart = await cartModel.findOne({ tourist: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(400).json({ message: "Product not found in the cart." });
        }

        cart.products.splice(productIndex, 1);

        await cart.save();
        res.status(200).json({ message: "Product removed completely from the cart.", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove product from the cart.", error: error.message });
    }
};
const reviewCart = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate("products.productId");
        if (!cart || cart.products.length === 0) {
            throw new Error("Your cart is empty or contains invalid products.");
        }

        // Prepare bulk operations to decrement inventory
        const bulkOps = cart.products.map((item) => ({
            updateOne: {
                filter: { _id: item.productId._id, quantity: { $gte: item.quantity } },
                update: { $inc: { quantity: -item.quantity } },
            },
        }));
        const result = await productModel.bulkWrite(bulkOps, { session });

        // Check if all products were successfully updated in the inventory
        if (result.modifiedCount !== cart.products.length) {
            throw new Error("Some products are out of stock.");
        }

        // Calculate the total amount for the order for confirmation or display purposes
        const totalAmount = cart.products.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        // Create a new order
        const newOrder = new orderModel({
            tourist: req.user._id,
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
                priceAtPurchase: item.productId.price,
            })),
            status: "Pending",
        });

        await newOrder.save({ session });

        // Create a pending receipt associated with this order
        const newReceipt = new receiptModel({
            type: 'product',
            status: 'pending',
            tourist: req.user._id,
            order: newOrder._id,
            price: totalAmount,
            receiptType: 'payment'
        });

        await newReceipt.save({ session });

        // Link the receipt to the order
        newOrder.receipt = newReceipt._id;
        await newOrder.save({ session });

        // Schedule the job to expire the order if not processed in time
        const job = await agenda.schedule("in 10 minutes", "expire order", { orderId: newOrder._id.toString() });
        newOrder.expirationJobId = job.attrs._id;
        await newOrder.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Cart reviewed and order created.",
            order: newOrder,
            totalAmount: totalAmount,
            receiptId: newReceipt._id
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Failed to review cart.", error: error.message });
    }
};

module.exports = {
    addProductToCart,
    incrementProductInCart,
    decrementProductInCart,
    removeProductFromCart,
    getCart,
    reviewCart,
};
