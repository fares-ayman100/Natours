const express = require('express');
const viewsController = require('../controllers/viewsController');
const isLoggedIN = require('../Middleware/isLoggedIn');

const router = express.Router();
router.use(isLoggedIN);

router.get('/', viewsController.getOverView);

router.get(`/tour/:slug`, viewsController.getTour);

router.get('/login', viewsController.getLoginUser);

module.exports = router;
