const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterdOBJ = require('../utils/filterObject');
const factory = require('./handlerFactory');


const getAllUsers = async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.status(200).json({
    status: httpStatus.SUCCESS,
    result: users.length,
    message: users,
  });
};

const updatedMe = catchAsync(async (req, res, next) => {
  // check if user pass password in the body
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please user /updatePassword.',
        400,
      ),
    );
  }

  // filter fields
  const filterdBody = filterdOBJ(req.body, 'name', 'email');

  //Update user document
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    filterdBody,
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updateUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({ status: httpStatus.SUCCESS });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return new AppError('User is not found', 404);
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: user,
  });
});

//*********

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

const deleteUser = factory.delteteDoc(User);

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updatedMe,
  deleteMe,
};
