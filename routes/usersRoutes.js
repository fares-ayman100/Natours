const express = require('express');
const userController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const protect = require('../Middleware/protect');
const allawedTo = require('../Middleware/allawedTo');
const uploadImage = require('../Middleware/uploadImage');
const resizeUserImage = require('../Middleware/resizeUserImage');
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
router.use(protect);

router
  .route('/getMe')
  .get(userController.getMe, userController.getUser);

router
  .route('/updateMe')
  .patch(
    uploadImage.single('photo'),
    resizeUserImage,
    userController.updatedMe,
  );

router.route('/deleteMe').delete(userController.deleteMe);

router
  .route('/updatePassword')
  .patch(authController.updatedPassword);

// Middleware
router.use(allawedTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
