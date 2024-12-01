const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishlistController");


router.post('/add-product/:productId', wishListController.addProductToWishlist);
router.delete('/remove-product/:productId', wishListController.removeProductFromWishlist);
router.get('/',wishListController.getWishlistWithProductDetails);
module.exports = router;