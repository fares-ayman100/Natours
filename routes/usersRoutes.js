const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const router = express.Router();
router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/logout').get(authController.logOut);

router
  .route('/forgetPassword')
  .post(authController.forgetPassword);
router
  .route('/resetPassword/:token')
  .patch(authController.resetPassword);

// Middleware
router.use(authController.protect);

router
  .route('/getMe')
  .get(userController.getMe, userController.getUser);

router
  .route('/updateMe')
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updatedMe,
  );

router.route('/deleteMe').delete(userController.deleteMe);

router
  .route('/updatePassword')
  .patch(authController.updatedPassword);

// Middleware
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
