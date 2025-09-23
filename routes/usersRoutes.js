const express = require('express');
const controller = require('../controllers/usersController');
const authcontroller = require('../controllers/authController');

const router = express.Router();
router.route('/signup').post(authcontroller.signup);
router.route('/signin').post(authcontroller.signin);
router
  .route('/')
  .get(authcontroller.protect, controller.getAllUsers)
  .post(controller.addUser);
router
  .route('/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);
module.exports = router;
