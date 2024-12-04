const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post('/add-product', cartController.addProductToCart);
router.delete('/remove-product', cartController.removeProductFromCart);
router.patch('/decrement-product', cartController.decrementProductInCart);
router.patch('/increment-product', cartController.incrementProductInCart);

module.exports = router;