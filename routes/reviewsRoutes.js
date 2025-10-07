const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router();

router
  .route('/')
  .get(reviewsController.getReviews)
  .post(
    protect,
    allawedTo('user'),
    reviewsController.createReview,
  );

module.exports = router;
