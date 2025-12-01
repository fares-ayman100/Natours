const express = require('express');
const protect = require('../Middleware/protect');
const bookingController = require('../controllers/bookingController');
const allawedTo = require('../Middleware/allawedTo');
const router = express.Router();

router.use(protect);

router
  .route('/checkout-session/:tourId')
  .get(bookingController.checkoutSesstion);

router.use(allawedTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getOneBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
