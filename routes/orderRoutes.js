const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController')

router
  .route('/')
  .get(authController.protect, orderController.getAllOrders)
  .post(authController.protect, authController.restrictTo('admin','user'), orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(authController.protect, authController.restrictTo('admin', 'user'), orderController.updateOrder)
  .delete(authController.protect, authController.restrictTo('admin'), orderController.deleteOrder);

module.exports = router;
