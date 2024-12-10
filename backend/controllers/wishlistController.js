const mongoose = require('mongoose');
const productModel = require('../models/productModel'); // Import Product model
const wishlistModel = require('../models/wishlistModel');
const cartModel = require("../models/cartModel"); // Import Wishlist model

const addProductToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required to add it to the wishlist.',
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(404).json({
                message: 'The selected product does not exist.',
            });
        }

        if (product.isArchived) {
            return res.status(400).json({
                message: 'This product is archived and cannot be added to your wishlist.',
            });
        }

        let wishlist = await wishlistModel.findOne({ tourist: req.user._id });

        if (!wishlist) {
            wishlist = new wishlistModel({
                tourist: req.user._id,
                products: [{ productId: productObjectId }],
            });
        } else {
            const productExists = wishlist.products.some(item => item.productId.equals(productObjectId));
            if (productExists) {
                return res.status(400).json({
                    message: 'This product is already in your wishlist.',
                });
            }
            wishlist.products.push({ productId: productObjectId });
        }

        await wishlist.save();

        res.status(200).json({
            message: 'Product has been successfully added to your wishlist.',
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the product to your wishlist.',
            error: error.message,
        });
    }
};
const removeProductFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required to remove it from the wishlist.',
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(404).json({
                message: 'The selected product does not exist.',
            });
        }

        let wishlist = await wishlistModel.findOne({ tourist: req.user._id });

        if (!wishlist) {
            return res.status(404).json({
                message: 'No wishlist found for the current user.',
            });
        }

        const productIndex = wishlist.products.findIndex(item => item.productId.equals(productObjectId));

        if (productIndex > -1) {
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            return res.status(200).json({
                message: 'The product has been successfully removed from your wishlist.',
            });
        } else {
            return res.status(400).json({
                message: 'The product is not in your wishlist.',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while removing the product from your wishlist.',
            error: error.message,
        });
    }
};
const getWishlistWithProductDetails = async (req, res) => {
    try {
        const wishlist = await wishlistModel
            .findOne({ tourist: req.user._id })
            .populate({
                path: "products.productId",
                match: { isArchived: false },
                select: "_id name picture price sellerId",
                populate: {
                    path: "sellerId",
                    select: "name role",
                },
            });

        if (!wishlist) {
            return res.status(404).json({
                message: 'No wishlist found for the current user.',
            });
        }

        const productsWithDetails = wishlist.products
            .filter(item => item.productId)
            .map(item => {
                const product = item.productId;
                const sellerName = product.sellerId && product.sellerId.role === "admin"
                    ? "Roamify"
                    : product.sellerId?.name || "Unknown Seller";

                return {
                    productId: product._id,
                    name: product.name,
                    picture: product.picture,
                    sellerName,
                    price: product.price,
                };
            });

        res.status(200).json({
            message: 'Your wishlist has been successfully retrieved.',
            wishlist: productsWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while retrieving your wishlist.',
            error: error.message,
        });
    }
};
const addProductFromWishlistToCart = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required to add it to the cart." });
        }

        const product = await productModel.findById(productId);

        if (!product || product.isArchived) {
            return res.status(404).json({ message: "The selected product is unavailable or does not exist." });
        }

        let cart = await cartModel.findOne({ tourist: req.user._id });

        if (!cart) {
            cart = new cartModel({ tourist: req.user._id, products: [] });
        }

        const productInCart = cart.products.find(item => item.productId.equals(productId));
        const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

        if (currentQuantityInCart >= product.quantity) {
            return res.status(400).json({
                message: `Only ${product.quantity} units are available. You already have ${currentQuantityInCart} in your cart.`,
            });
        }

        if (productInCart) {
            const totalRequestedQuantity = currentQuantityInCart + 1;
            if (totalRequestedQuantity > product.quantity) {
                return res.status(400).json({
                    message: `Only ${product.quantity} units are available. You can add up to ${product.quantity - currentQuantityInCart} more.`,
                });
            }
            productInCart.quantity = totalRequestedQuantity;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();

        await wishlistModel.updateOne(
            { tourist: req.user._id },
            { $pull: { products: { productId } } }
        );

        res.status(200).json({ message: "Product successfully added to your cart from the wishlist." });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while adding the product to the cart from the wishlist.",
            error: error.message,
        });
    }
};

module.exports = {
    addProductToWishlist,
    removeProductFromWishlist,
    getWishlistWithProductDetails,
    addProductFromWishlistToCart
};
