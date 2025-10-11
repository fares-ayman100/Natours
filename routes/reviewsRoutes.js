const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const getTourUserIds = require('../Middleware/getTourUserIds');
const router = express.Router({ mergeParams: true });

// Middleware
router.use(protect);

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    allawedTo('user'),
    getTourUserIds,
    reviewsController.createReview,
  );

router
  .route('/:id')
  .get(reviewsController.getReview)
  .delete(
    allawedTo('user', 'admin'),
    reviewsController.deleteReview,
  )
  .patch(
    allawedTo('user', 'admin'),
    reviewsController.updateReview,
  ); 

module.exports = router;
