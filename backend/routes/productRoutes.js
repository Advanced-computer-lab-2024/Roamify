const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/add-product/:id", productController.addProduct);
router.put("/edit-product/:id", productController.updateProduct);
router.get("/sort-products", productController.sortProductsByRating);
router.get("/filter-by-price", productController.filterProductsByPrice);
router.get("/search", productController.searchProductByName);
router.get("/get-all", productController.getAllProducts);
module.exports = router;
