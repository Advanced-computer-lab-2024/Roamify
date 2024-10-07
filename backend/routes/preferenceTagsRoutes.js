const express = require("express");
const router = express.Router();
const preferenceTagController = require("../controllers/preferenceTagController");

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
