const express = require('express');
const controller = require('../controllers/toursController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(controller.aliasTopTours, controller.getAllTours);

router.route('/tours-stats').get(controller.tourStats);

router.route('/monthly-plan/:year').get(controller.monthlyPlan);

router
  .route('/')
  .get(protect, controller.getAllTours)
  .post(
    protect,
    allawedTo('admin', 'lead-guide'),
    controller.createTour,
  );

router
  .route('/:id')
  .get(controller.getTour)
  .patch(
    protect,
    allawedTo('admin', 'lead-guide'),
    controller.updateTour,
  )
  .delete(
    protect,
    allawedTo('admin', 'lead-guide'),
    controller.deleteTour,
  );
module.exports = router;
