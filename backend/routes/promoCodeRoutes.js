const express = require('express');
const router = express.Router();
const promoCodeController = require('../controllers/promoCodeController');

router.post('/',promoCodeController.createPromoCode); // Create promo code

module.exports = router;
