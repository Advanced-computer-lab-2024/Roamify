const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        tourist: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'product',
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('wish list', wishlistSchema);
