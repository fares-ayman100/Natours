const express = require('express');
const viewsController = require('../controllers/viewsController');
const myBookings = require('../controllers/viewsController');
const authController = require('../controllers/authController');


const router = express.Router();
router.use(authController.isLoggedIN);
router.get('/', myBookings.alert);

router.get('/', viewsController.getOverView);

router.get(`/tour/:slug`, viewsController.getTour);

router.get('/login', viewsController.getLoginUser);
router.get('/signup',viewsController.getSignupUser)
router.get(
  '/my-bookings',
  authController.protect,
  myBookings.getMyBooking,
);

router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
