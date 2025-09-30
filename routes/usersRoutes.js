const express = require('express');
const controller = require('../controllers/usersController');
const authcontroller = require('../controllers/authController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');

const router = express.Router();
router.route('/signup').post(authcontroller.signup);

router.route('/signin').post(authcontroller.signin);

router.route('/forgetPassword').post(authcontroller.forgetPassword);

router.route('/updateMe').patch(protect, controller.updatedMe);

router.route('/deleteMe').delete(protect, controller.deleteMe);

router
  .route('/resetPassword/:token')
  .patch(authcontroller.resetPassword);

router
  .route('/updatePassword')
  .patch(protect, authcontroller.updatedPassword);

router.route('/').get(protect, controller.getAllUsers);

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
