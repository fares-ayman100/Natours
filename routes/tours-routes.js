const express = require('express');
const controller = require('../controllers/tours-controller');
const router = express.Router();

router.param('id', controller.checkID);

router
  .route('/')
  .get(controller.getAllTours)
  .post(controller.checkBody, controller.addTour);
router
  .route('/:id')
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(controller.deleteTour);
module.exports = router;
