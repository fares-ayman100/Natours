const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const getTourUserIds = require('../Middleware/getTourUserIds');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    protect,
    allawedTo('user'),
    getTourUserIds,
    reviewsController.createReview,
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .delete(reviewsController.deleteReview)
  .patch(reviewsController.updateReview); 

module.exports = router;
