const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    protect,
    allawedTo('user'),
    reviewsController.createReview,
  );

router.route('/:id').get(reviewsController.getReview); 

module.exports = router;
