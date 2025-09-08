const express = require('express');
const router = express.Router();
const controller = require('../controllers/users-controller');
router.route('/').get(controller.getAllUsers).post(controller.addUser);
router
  .route('/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);
module.exports = router;
