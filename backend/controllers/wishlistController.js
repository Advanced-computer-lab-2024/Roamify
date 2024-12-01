const mongoose = require('mongoose');
const productModel = require('../models/productModel'); // Import Product model
const wishlistModel = require('../models/wishlistModel'); // Import Wishlist model

const addProductToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                message: 'Please provide a product ID to add to the wishlist.'
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Validate if the product exists and is not archived
        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(400).json({
                message: 'The product you selected does not exist.'
            });
        }

        if (product.isArchived) {
            return res.status(400).json({
                message: 'The product you selected is archived and cannot be added to the wishlist.'
            });
        }

        // Find or create the wishlist
        let wishlist = await wishlistModel.findOne({ tourist: req.user._id });

        if (!wishlist) {
            wishlist = new wishlistModel({
                tourist: req.user._id,
                products: [{ productId: productObjectId }]
            });
        } else {
            const productExists = wishlist.products.some(item => item.productId.equals(productObjectId));
            if (productExists) {
                return res.status(400).json({
                    message: 'The product is already in your wishlist.'
                });
            }
            wishlist.products.push({ productId: productObjectId });
        }

        await wishlist.save();

        res.status(200).json({ message: 'Product added to wishlist successfully.' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add product to wishlist.'
        });
    }
};
const removeProductFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                message: 'Please provide a product ID to remove from the wishlist.'
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Validate if the product exists
        const product = await productModel.findById(productObjectId);
        if (!product) {
            return res.status(400).json({
                message: 'The product you selected does not exist.'
            });
        }

        if (product.isArchived) {
            return res.status(400).json({
                message: 'The product you selected is archived and cannot be removed from the wishlist.'
            });
        }

        // Find the wishlist for the tourist
        let wishlist = await wishlistModel.findOne({ tourist: req.user._id });

        if (!wishlist) {
            return res.status(404).json({
                message: 'Wishlist not found.'
            });
        }

        // Check if the product exists in the wishlist
        const productIndex = wishlist.products.findIndex(item => item.productId.equals(productObjectId));

        if (productIndex > -1) {
            // Remove the product from the wishlist
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            return res.status(200).json({
                message: 'Product removed from wishlist successfully.'
            });
        } else {
            return res.status(400).json({
                message: 'The product does not exist in your wishlist.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to remove product from wishlist.'
        });
    }
};
const getWishlistWithProductDetails = async (req, res) => {
    try {
        // Find the wishlist for the logged-in tourist
        const wishlist = await wishlistModel
            .findOne({ tourist: req.user._id })
            .populate({
                path: "products.productId",
                match: { isArchived: false }, // Exclude archived products
                select: "name picture price sellerId", // Select fields from the product
                populate: {
                    path: "sellerId", // Populate seller details
                    select: "name role", // Select seller's name and role
                },
            });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found for the current tourist.",
            });
        }

        // Map wishlist products to include desired details
        const productsWithDetails = wishlist.products
            .filter((item) => item.productId) // Exclude null or filtered-out products
            .map((item) => {
                const product = item.productId;

                const sellerName =
                    product.sellerId && product.sellerId.role === "admin"
                        ? "Roamify"
                        : product.sellerId?.name || "Unknown Seller";

                return {
                    name : product.name,
                    picture: product.picture,
                    sellerName,
                    price: product.price,
                };
            });

        res.status(200).json({
            message: "Wishlist retrieved successfully.",
            wishlist: productsWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve the wishlist.",
            error: error.message, // Optional debugging detail
        });
    }
};


module.exports = {
    addProductToWishlist,
    removeProductFromWishlist,
    getWishlistWithProductDetails
};
