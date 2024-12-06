const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/product/", cartController.addProductToCart);
router.delete("/product/:productId", cartController.removeProductFromCart);
router.patch("/product/:productId/decrement", cartController.decrementProductInCart);
router.patch("/product/:productId/increment", cartController.incrementProductInCart);

module.exports = router;