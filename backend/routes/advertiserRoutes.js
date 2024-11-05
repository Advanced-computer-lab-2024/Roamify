const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post("/create-profile", advertiserController.createProfile);
router.get("/get-profile", advertiserController.getProfile);
router.put("/update-profile", advertiserController.updateProfile);
router.post("/create-activity", advertiserController.createActivity);
router.put("/update-activity/:activityId", advertiserController.updateActivity
);
router.delete(
  "/delete-activity/:activityid",
  advertiserController.deleteActivity
);
router.post('/upload-logo', advertiserController.upload, advertiserController.uploadLogo);

router.get("/get-my-activities", advertiserController.getMyActivities);
router.post("/create-transportation", advertiserController.createTransportation);
router.get("/get-transportations", advertiserController.getAllTransportation);
router.delete("/delete-transportation", advertiserController.deleteTransportation);
router.put("/edit-transportation", advertiserController.editTransportation);

module.exports = router;