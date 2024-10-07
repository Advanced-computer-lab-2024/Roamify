const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post("/create-profile/:id", advertiserController.createProfile);
router.get("/get-profile/:id", advertiserController.getProfile);
router.put("/update-profile/:id", advertiserController.updateProfile);
router.post("/create-activity/:id", advertiserController.createActivity);
router.get("/get-activities", advertiserController.getActivities);
router.put("/update-activity/:advertiserId/:activityId",advertiserController.updateActivity
);
router.delete(
  "/delete-activity/:advertiserid/:activityid",
  advertiserController.deleteActivity
);
router.get("/get-my-activities/:id", advertiserController.getMyActivities);

module.exports = router;