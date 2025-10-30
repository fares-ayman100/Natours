const express = require('express');
const viewsController = require('../controllers/viewsController');
const isLoggedIN = require('../Middleware/isLoggedIn');
const protect = require('../Middleware/protect');

const router = express.Router();
router.use(isLoggedIN);

router.get('/', isLoggedIN, viewsController.getOverView);

router.get(`/tour/:slug`, isLoggedIN, viewsController.getTour);

router.get('/login', isLoggedIN, viewsController.getLoginUser);

router.get('/me', protect, viewsController.getAccount);

module.exports = router;
