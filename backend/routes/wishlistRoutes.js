const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishlistController");

router.post('/:productId', wishListController.addProductToWishlist);
router.post('/:productId/cart', wishListController.addProductFromWishlistToCart);
router.delete('/:productId', wishListController.removeProductFromWishlist);
router.get('/', wishListController.getWishlistWithProductDetails);

module.exports = router;