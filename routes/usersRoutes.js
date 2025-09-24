const express = require('express');
const controller = require('../controllers/usersController');
const authcontroller = require('../controllers/authController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');

const router = express.Router();
router.route('/signup').post(authcontroller.signup);

router.route('/signin').post(authcontroller.signin);

router
  .route('/')
  .get(protect, controller.getAllUsers)
  .post(protect, controller.addUser);

router
  .route('/:id')
  .get(controller.getUser)
  .patch(
    protect,
    allawedTo('admin', 'lead-guide'),
    controller.updateUser,
  )
  .delete(
    protect,
    allawedTo('admin', 'lead-guide'),
    controller.deleteUser,
  );
module.exports = router;
