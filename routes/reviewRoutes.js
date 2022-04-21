const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictedTo('user'),
    reviewController.createReview
  );

router.route('/:id').delete(reviewController.deleteReview);
module.exports = router;
