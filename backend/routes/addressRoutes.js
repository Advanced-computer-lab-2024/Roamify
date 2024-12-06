const addressController = require("../controllers/addressController");
const express = require("express");
const router = express.Router();

router.post('/', addressController.addAddress);
router.get('/', addressController.getUserAddresses);
router.patch('/:id/default', addressController.setDefaultAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;