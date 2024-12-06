const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const mongoose = require('mongoose');


const getCart = async (req, res) => {
    try {
        // Find the cart for the logged-in user
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate({
            path: "products.productId",
            select: "name picture", // Select `name` and `picture` (array of images)
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Map the cart products to include only the required fields
        const cartDetails = cart.products.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.picture?.[0]?.url || null, // Use the first image URL or null if unavailable
            quantity: item.quantity,
        }));

        res.status(200).json({ message: "Cart retrieved successfully.", cart: cartDetails });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve cart." });
    }
};
const addProductToCart = async (req, res) =>    {
    try {
        const { product: productId, quantity = 1 } = req.body;

        if(quantity <= 0)
            return res.status(400).json({message:"Invalid quantity"});

        if (!productId) {
            return res.status(400).json({ message: 'Please choose a product to add to the cart.' });
        }

        const product = await productModel.findById(productId);
        if (!product || product.isArchived) {
            return res.status(404).json({ message: 'Product not found or unavailable.' });
        }

        let cart = await cartModel.findOne({ tourist: req.user._id });

        const productInCart = cart?.products.find((item) => item.productId.equals(productId));
        const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

        const totalRequestedQuantity = currentQuantityInCart + quantity;

        if (totalRequestedQuantity > product.quantity) {
            const maxAllowed = product.quantity - currentQuantityInCart;
            return res.status(400).json({
                message: `Only ${product.quantity} units available. You already have ${currentQuantityInCart} in your cart. You can add up to ${maxAllowed} more.`,
            });
        }

        if (!cart) {
            cart = new cartModel({
                tourist: req.user._id,
                products: [{ productId, quantity }],
            });
        } else {
            if (productInCart) {
                productInCart.quantity = totalRequestedQuantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart.', error: error.message });
    }
};
const incrementProductInCart = async (req, res) => {
    try {
        const productId = req.params.productId; // Extract product ID from URL

        const product = await productModel.findById(productId);
        if (!product || product.isArchived) {
            return res.status(404).json({ message: 'Product not found or unavailable.' });
        }

        const cart = await cartModel.findOne({ tourist: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const productInCart = cart.products.find((item) => item.productId.equals(productId));
        if (!productInCart) {
            return res.status(400).json({ message: 'Product not found in the cart.' });
        }

        const totalRequestedQuantity = productInCart.quantity + 1;

        if (totalRequestedQuantity > product.quantity) {
            return res.status(400).json({
                message: `Only ${product.quantity} units available. You already have ${productInCart.quantity} in your cart.`,
            });
        }

        productInCart.quantity += 1;

        await cart.save();
        res.status(200).json({ message: 'Product quantity incremented successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to increment product quantity.', error: error.message });
    }
};
const decrementProductInCart = async (req, res) => {
    try {
        const productId = req.params.productId; // Extract product ID from URL

        const cart = await cartModel.findOne({ tourist: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not found in the cart.' });
        }

        const productInCart = cart.products[productIndex];

        if (productInCart.quantity === 1) {
            // Remove the product if quantity is 1
            cart.products.splice(productIndex, 1);
        } else {
            // Decrement the quantity
            productInCart.quantity -= 1;
        }

        await cart.save();
        res.status(200).json({ message: 'Product quantity decremented successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to decrement product quantity.', error: error.message });
    }
};
const removeProductFromCart = async (req, res) => {
    try {
        const productId = req.params.productId; // Extract product ID from URL

        const cart = await cartModel.findOne({ tourist: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not found in the cart.' });
        }

        // Remove the product completely
        cart.products.splice(productIndex, 1);

        await cart.save();
        res.status(200).json({ message: 'Product removed completely from the cart.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove product from the cart.', error: error.message });
    }
};

module.exports = {addProductToCart,removeProductFromCart,incrementProductInCart,decrementProductInCart,getCart};
