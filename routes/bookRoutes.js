const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const bookController = require('./../controllers/bookController');

//

router
  .route('/')
  .get(authController.protect, bookController.getAllBooks)
  .post(authController.protect, authController.restrictTo('admin','user'), bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(authController.protect, authController.restrictTo('admin', 'user'), bookController.updateBook)
  .delete(authController.protect, authController.restrictTo('admin'), bookController.deleteBook);

module.exports = router;
