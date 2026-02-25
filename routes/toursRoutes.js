const express = require('express');
const tourController = require('../controllers/toursController');
const reviewRouter = require('../routes/reviewsRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/:tourID/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tours-stats').get(tourController.tourStats);

//tour-within/400/center/34.090581,-118.222156/unit/km
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.toursWithIn);

router
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.monthlyPlan,
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

 
module.exports = router;
