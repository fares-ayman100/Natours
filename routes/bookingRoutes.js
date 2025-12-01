const express = require('express');
const protect = require('../Middleware/protect');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
router
  .route('/checkout-session/:tourId')
  .get(protect, bookingController);

module.exports = router;
