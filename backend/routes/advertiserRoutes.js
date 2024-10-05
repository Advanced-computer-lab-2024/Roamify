const express = require('express');
const advertiserController = require('../controllers/advertiserController');

const router = express.Router();

router.post('/createprofile/:id',advertiserController.createProfile);
router.get('/getprofile/:id', advertiserController.getProfile);
router.put('/updateprofile/:id', advertiserController.updateProfile);
router.post('/createactivity/:id', advertiserController.createActivity);
router.get('/getactivity/:id', advertiserController.getActivity);
 router.put('/update/:id', advertiserController.updateActivity);
router.delete('/deleteactivity/:id', advertiserController.deleteActivity);
router.get('/myactivities/:id', advertiserController.getMyActivities);

module.exports = router;