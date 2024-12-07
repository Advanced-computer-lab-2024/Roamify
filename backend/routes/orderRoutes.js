const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.patch('/:orderId/address/:addressId', orderController.updateOrderAddress);
router.post('/:orderId/payment', orderController.processPayment);
router.patch('/:orderId/delivery', orderController.markOrderOutForDelivery);
router.post('/:orderId/confirm-cod',orderController.confirmCODPayment);

module.exports = router;
