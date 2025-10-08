const express = require('express');
const tourController = require('../controllers/toursController');
const reviewRouter = require('../routes/reviewsRoutes');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router();

router.use('/:tourID/reviews', reviewRouter);

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

 
module.exports = router;
