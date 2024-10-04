const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post('/create-profile/:id',advertiserController.createProfile);
 router.get('/get-profile/:id', advertiserController.getProfile);
 router.put('/update-profile/:id', advertiserController.updateProfile);
// router.post('/create/activity', advertiserController.createActivity);
// router.get('/:id', advertiserController.getActivity);
// router.put('/update/:id', advertiserController.updateActivity);
// router.delete('/:id', advertiserController.deleteActivity);
// router.get('/myActivities', advertiserController.getMyActivities);

module.exports = router;