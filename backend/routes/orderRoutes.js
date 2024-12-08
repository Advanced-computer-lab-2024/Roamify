const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {authenticate} = require("../middleware/authMiddleware");

router.patch('/:orderId/address/:addressId',authenticate(["tourist"]), orderController.updateOrderAddress);
router.post('/:orderId/payment',authenticate(["tourist"]), orderController.processPayment);
router.patch('/:orderId/delivery',authenticate(["admin"]), orderController.markOrderOutForDelivery);
router.post('/:orderId/confirm-cod',authenticate(["tourist"]),orderController.confirmCODPayment);
router.get('/',authenticate(["tourist"]), orderController.getUserOrders);
router.get('/:orderId',authenticate(["tourist"]), orderController.getOrderDetails);
router.patch('/:orderId/cancel',authenticate(["tourist"]), orderController.cancelOrder);
router.patch('/:orderId/promo-code/:promoCode',authenticate(["tourist"]),orderController.applyPromoCodeToOrder);

module.exports = router;
