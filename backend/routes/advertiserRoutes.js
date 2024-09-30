const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.get('/details', advertiserController.getDetails);
router.put('/update', advertiserController.updateDetails);
router.get('/:id', advertiserController.getActivity);
router.put('/update/:id', advertiserController.updateActivity);
router.post('/create', advertiserController.createActivity);
router.get('/activities', advertiserController.getMyActivities);
router.delete('/:id', advertiserController.deleteActivity);

module.exports = router;