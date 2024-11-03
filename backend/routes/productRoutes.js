const express = require("express");
const productController = require("../controllers/productController");
const {authenticate} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-product",authenticate(["admin","seller"]),productController.upload, productController.addProduct);
router.put("/edit-product/:id",authenticate(["admin","seller"]),productController.upload,productController.updateProduct);
router.get("/",authenticate(["admin","seller","tourist"]), productController.getFilteredProducts);
module.exports = router;