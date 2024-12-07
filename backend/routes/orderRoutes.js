const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.patch('/:orderId/address/:addressId', orderController.updateOrderAddress);
router.post('/:orderId/payment', orderController.processPayment);

module.exports = router;
