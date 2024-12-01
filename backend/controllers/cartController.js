const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const mongoose = require('mongoose');
const addProductToCart = async (req, res) => {
    try {
        if (!req.body.product) {
            return res.status(400).json({ message: 'Please choose a product to add to the cart.' });
        }

        const productId = new mongoose.Types.ObjectId(req.body.product);
        const quantity = req.body.quantity || 1; // Default quantity to 1 if not specified

        // Find the product in the database
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Please choose a valid product.' });
        }

        // Check if the requested quantity is available
        if (product.quantity < quantity) {
            return res.status(400).json({
                message: "Insufficient stock available. Please reduce the quantity or check back later."
            });
        }

        let cart = await cartModel.findOne({ tourist: req.user._id });

        if (!cart) {
            cart = new cartModel({
                tourist: req.user._id,
                products: [{ productId, quantity }]
            });
        } else {
            const productIndex = cart.products.findIndex(item => item.productId.equals(productId));

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart.', error: error.message });
    }
};
const removeProductFromCart = async (req, res) => {
    try {
        if (!req.body.product) return res.status(400).json({ message: 'please choose a product to remove from cart' });

        const productId = new mongoose.Types.ObjectId(req.body.product);

        const product = await productModel.findById(productId);
        if (!product) return res.status(400).json({ message: 'please choose a valid product to remove' });

        let cart = await cartModel.findOne({ tourist: req.user._id });

        const productIndex = cart.products.findIndex(item => item.productId.equals(productId));

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);

        }
        else
            return res.status(400).json({ message: 'product does not exist in cart' });


        await cart.save();
        return res.status(200).json({ message: 'removed product successfully' });
    }
    catch (error) {
        return res.status(400).json({ message: 'couldn\'t remove product from cart', error: error.message })

    }
}

module.exports = { removeProductFromCart, addProductToCart };
