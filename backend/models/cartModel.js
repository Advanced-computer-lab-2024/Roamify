const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product',
            },
            quantity: {
                type: Number,
                min: 1
            }
        }
    ]
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
