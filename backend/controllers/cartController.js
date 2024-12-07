const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const { expireOrder } = require("./orderController");
const mongoose = require('mongoose');

const getCart = async (req, res) => {
    try {
        // Find the cart for the logged-in user
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate({
            path: "products.productId",
            select: "name picture price", // Include `name`, `picture`, and `price`
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Map the cart products to include required fields
        const cartDetails = cart.products.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.picture?.[0]?.url || null,
            quantity: item.quantity,
            price: item.productId.price // Fetch the product price from the populated product
        }));

        res.status(200).json({ message: "Cart retrieved successfully.", cart: cartDetails });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve cart.", error: error.message });
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
const reviewCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ tourist: req.user._id }).populate('products.productId');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty. Add items before checking out.' });
        }

        const removedProducts = [];
        const outOfStockProducts = [];
        const unavailableProducts = [];
        const validProducts = [];

        // Check and remove any previous Pending order
        const existingOrder = await orderModel.findOne({ tourist: req.user._id, status: 'Pending' });
        if (existingOrder) {
            for (const item of existingOrder.products) {
                await productModel.findByIdAndUpdate(item.productId, { $inc: { quantity: item.quantity } });
            }
            await existingOrder.deleteOne();
        }

        // Validate and lock product quantities
        for (let i = cart.products.length - 1; i >= 0; i--) {
            const item = cart.products[i];
            const product = await productModel.findById(item.productId);

            if (!product || product.isArchived) {
                removedProducts.push(`${product?.name || 'A product'} has been removed from your cart.`);
                cart.products.splice(i, 1);
                continue;
            }

            if (product.quantity <= 0) {
                outOfStockProducts.push(`${product.name} is out of stock.`);
                cart.products.splice(i, 1);
                continue;
            }

            if (product.quantity < item.quantity) {
                unavailableProducts.push(`${product.name} has insufficient stock.`);
                continue;
            }

            validProducts.push(item);
            product.quantity -= item.quantity; // Lock the quantity
            await product.save();
        }

        await cart.save();

        if (removedProducts.length > 0 || outOfStockProducts.length > 0 || unavailableProducts.length > 0) {
            return res.status(400).json({
                message: 'Issues were found in your cart.',
                removedProducts,
                outOfStockProducts,
                unavailableProducts,
            });
        }

        // Calculate total and create a new Pending order
        const totalAmount = validProducts.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

        const newOrder = new orderModel({
            tourist: req.user._id,
            products: validProducts.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
            totalAmount,
        });

        await newOrder.save();

        // Start expiration timer
        setTimeout(async () => await expireOrder(newOrder._id), 15 * 60 * 1000);

        res.status(200).json({ message: 'Cart reviewed successfully.', orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to review cart.', error: error.message });
    }
};

module.exports = {addProductToCart,removeProductFromCart,incrementProductInCart,decrementProductInCart,getCart,reviewCart};
