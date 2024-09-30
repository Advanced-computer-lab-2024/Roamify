const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post('/create/profile',advertiserController.createProfile);
router.get('/details', advertiserController.getProfile);
router.put('/update', advertiserController.updateProfile);
router.post('/create/activity', advertiserController.createActivity);
router.get('/:id', advertiserController.getActivity);
router.put('/update/:id', advertiserController.updateActivity);
router.delete('/:id', advertiserController.deleteActivity);
router.get('/myActivities', advertiserController.getMyActivities);

module.exports = router;