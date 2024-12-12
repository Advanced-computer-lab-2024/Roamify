const express = require("express");
const productController = require("../controllers/productController");
const {authenticate} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-product",authenticate(["admin","seller"]),productController.upload, productController.addProduct);
router.put("/edit-product/:id",authenticate(["admin","seller"]),productController.upload,productController.updateProduct);
router.get("/",authenticate(["admin","seller","tourist"]), productController.getFilteredProducts);
router.get("/fetch-my-products",authenticate(["seller"]),productController.getMyProducts);
router.post("/archive/:id",authenticate(["admin","seller"]),productController.archiveProduct);
router.post("/unarchive/:id",authenticate(["admin","seller"]),productController.unarchiveProduct);
router.post('/review',authenticate(["tourist"]),productController.addReview);
module.exports = router;