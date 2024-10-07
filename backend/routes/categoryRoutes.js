const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create-category/", categoryController.createCategory);
router.get("/get-categories", categoryController.getAllCategories);
router.get("/get-category/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

module.exports = router;
