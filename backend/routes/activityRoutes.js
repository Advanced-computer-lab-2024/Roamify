const activityController = require("../controllers/activityController");
const express = require("express");
const router = express.Router();

router.get("/", activityController.getFilteredActivities);

module.exports = router;