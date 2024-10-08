const express = require("express");
const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
const preferenceTagController = require("../controllers/preferenceTagController");
const router = express.Router();

router.post("/add-tourism-governor", adminController.addTourismGovernor);
router.delete("/delete-account/:id", adminController.deleteUser);
router.post("/add-admin", adminController.addAdmin);
router.post("/create-category/", categoryController.createCategory);
router.get("/get-categories", categoryController.getAllCategories);
router.get("/get-category/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);


router.post(
  "/create-preference-tags",
  preferenceTagController.createPreferenceTag
);
router.get(
  "/get-all-preference-tags",
  preferenceTagController.getAllPreferenceTags
);
router.get("get/:id", preferenceTagController.getPreferenceTagById);
router.put(
  "/update-preference-tags/:id",
  preferenceTagController.updatePreferenceTag
);
router.delete(
  "/delete-preference-tags/:id",
  preferenceTagController.deletePreferenceTag
);

module.exports = router;
