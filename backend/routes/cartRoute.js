const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");


router.post('/add-product-to-cart', cartController.addProductToCart);
router.delete('/remove-product-from-cart', cartController.removeProductFromCart);


module.exports = router;