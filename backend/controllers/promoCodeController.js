const promoCodeModel = require('../models/promoCodeModel');

const createPromoCode = async (req, res) => {
    try {
        const { code, discountPercentage, expiryDate, usesLeft } = req.body;

        if (!code || !discountPercentage || !expiryDate) {
            return res.status(400).json({ message: 'Code, discount percentage, and expiry date are required.' });
        }

        if (discountPercentage < 1 || discountPercentage > 100) {
            return res.status(400).json({ message: 'Discount percentage must be between 1 and 100.' });
        }

        // Check if the promo code already exists
        const existingPromoCode = await promoCodeModel.findOne({ code });
        if (existingPromoCode) {
            return res.status(400).json({ message: 'Promo code already exists. Please choose a different code.' });
        }

        const newPromoCode = new promoCodeModel({
            code,
            discountPercentage,
            expiryDate,
            isActive: true,
            createdBy: req.user._id,
            usesLeft
        });

        await newPromoCode.save();
        res.status(201).json({ message: 'Promo code created successfully.', promoCode: newPromoCode });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create promo code.', error: error.message });
    }
};

module.exports = {
    createPromoCode
};
