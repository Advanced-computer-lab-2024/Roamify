const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    expiryDate: { type: Date, required: true },
    usesLeft: { type: Number, default: null }, // null means unlimited
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const promoCodeModel = mongoose.model('promo code', promoCodeSchema);
module.exports = promoCodeModel;
