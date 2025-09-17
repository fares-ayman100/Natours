const express = require('express');
const controller = require('../controllers/users-controller');

const router = express.Router();
router
  .route('/')
  .get(controller.getAllUsers)
  .post(controller.addUser);
router
  .route('/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);
module.exports = router;
