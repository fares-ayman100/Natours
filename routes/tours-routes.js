const express = require('express');
const controller = require('../controllers/toursController');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(controller.aliasTopTours, controller.getAllTours);
router.route('/tours-stats').get(controller.tourStats);
router.route('/monthly-plan/:year').get(controller.monthlyPlan);  
router.route('/').get(controller.getAllTours).post(controller.createTour);
router
  .route('/:id')
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(controller.deleteTour);
module.exports = router;
