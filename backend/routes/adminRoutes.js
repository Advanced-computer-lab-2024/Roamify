const express = require("express");
const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
const preferenceTagController = require("../controllers/preferenceTagController");
const historicalTagController = require("../controllers/historicalTagController");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/add-tourism-governor", adminController.addTourismGovernor);
router.delete("/delete-account/:id", adminController.deleteUser);
router.post("/add-admin", adminController.addAdmin);

router.post("/create-category", categoryController.createCategory);
router.get("/get-categories", categoryController.getAllCategories);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);

router.post("/create-preference-tag",preferenceTagController.createPreferenceTag);
router.get("/get-all-preference-tags", preferenceTagController.getAllPreferenceTags);
router.put("/update-preference-tag/:id", preferenceTagController.updatePreferenceTag);
router.delete("/delete-preference-tag/:id", preferenceTagController.deletePreferenceTag);

router.post("/create-historical-tag", historicalTagController.createHistoricalTag);

router.put("/edit-product/:id", productController.updateProduct);
router.put("/add-product/:id", productController.addProduct);


module.exports = router;
