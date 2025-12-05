const express = require('express');
const viewsController = require('../controllers/viewsController');
const isLoggedIN = require('../Middleware/isLoggedIn');
const protect = require('../Middleware/protect');
const myBookings = require('../controllers/viewsController');

const router = express.Router();
router.use(isLoggedIN);
router.get('/', myBookings.alert);

router.get('/', viewsController.getOverView);

router.get(`/tour/:slug`, viewsController.getTour);

router.get('/login', viewsController.getLoginUser);
router.get('/signup',viewsController.getSignupUser)
router.get('/my-bookings', protect,myBookings.getMyBooking);

router.get('/me', protect, viewsController.getAccount);

module.exports = router;
