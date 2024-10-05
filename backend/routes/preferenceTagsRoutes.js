const express = require("express");
const router = express.Router();
const preferenceTagController = require("../controllers/preferenceTagController");


router.post("/", preferenceTagController.createPreferenceTag); 
router.get("/", preferenceTagController.getAllPreferenceTags); 
router.get("/:id", preferenceTagController.getPreferenceTagById);
router.put("/:id", preferenceTagController.updatePreferenceTag); 
router.delete("/:id", preferenceTagController.deletePreferenceTag); 

module.exports = router;
