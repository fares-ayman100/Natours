const express = require('express');
const userController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');

const router = express.Router();
router.route('/signup').post(authController.signup);

router.route('/signin').post(authController.signin);

router
  .route('/forgetPassword')
  .post(authController.forgetPassword);

router
  .route('/updateMe')
  .patch(protect, userController.updatedMe);

router
  .route('/deleteMe')
  .delete(protect, userController.deleteMe);

router
  .route('/getMe')
  .get(protect, userController.getMe, userController.getUser);

router
  .route('/resetPassword/:token')
  .patch(authController.resetPassword);

router
  .route('/updatePassword')
  .patch(protect, authController.updatedPassword);

router.route('/').get(protect, userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    protect,
    allawedTo('admin', 'lead-guide'),
    userController.updateUser,
  )
  .delete(
    protect,
    allawedTo('admin', 'lead-guide'),
    userController.deleteUser,
  );
module.exports = router;
