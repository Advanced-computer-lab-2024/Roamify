const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/add-product/:id", productController.addProduct);
module.exports = router;
