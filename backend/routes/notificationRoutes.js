const express = require('express')
const router = express.Router();
const notificationController = require('../controllers/notificationController')

router.get('/', notificationController.getNotifications)
router.put('/', notificationController.markAsRead)

module.exports = router;