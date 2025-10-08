const express = require('express');
const tourController = require('../controllers/toursController');
const reviewController = require('../controllers/reviewsController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tours-stats').get(tourController.tourStats);

router
  .route('/monthly-plan/:year')
  .get(tourController.monthlyPlan);

router
  .route('/')
  .get(protect, tourController.getAllTours)
  .post(
    protect,
    allawedTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    protect,
    allawedTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    protect,
    allawedTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

router
  .route('/:tourID/reviews')
  .post(protect,allawedTo('user'),reviewController.createReview);  
module.exports = router;
