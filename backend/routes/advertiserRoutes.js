const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post("/create-profile", advertiserController.createProfile);
router.get("/get-profile", advertiserController.getProfile);
router.put("/update-profile", advertiserController.updateProfile);
router.post("/create-activity", advertiserController.createActivity);
router.get("/get-activities", advertiserController.getActivities);
router.put("/update-activity/:activityId",advertiserController.updateActivity
);
router.delete(
  "/delete-activity/:advertiserid/:activityid",
  advertiserController.deleteActivity
);
router.get("/get-my-activities/:id", advertiserController.getMyActivities);

module.exports = router;