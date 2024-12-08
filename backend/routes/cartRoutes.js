const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const {cancelPendingOrderAndRestoreStock,validateAndCleanCart} = require("../middleware/cartValidation");

router.use(cancelPendingOrderAndRestoreStock);
router.use(validateAndCleanCart);

router.get("/", cartController.getCart);
router.post("/product", cartController.addProductToCart);
router.delete("/product/:productId", cartController.removeProductFromCart);
router.patch("/product/:productId/decrement", cartController.decrementProductInCart);
router.patch("/product/:productId/increment", cartController.incrementProductInCart);
router.post("/checkout", cartController.reviewCart);

module.exports = router;
