const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const getAllUsers = async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: users,
  });
};
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: user,
  });
};
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: user,
  });
};
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: null,
  });
};
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
