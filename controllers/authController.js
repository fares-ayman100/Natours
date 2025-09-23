const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateAccessToken = require('../utils/generateAccessToken');

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = generateAccessToken({ id: newUser._id });

  res.status(201).json({
    status: httpStatus.SUCCESS,
    token,
    data: { user: newUser },
  });
});
const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and Pasword Is Required', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (
    !user ||
    !(await user.correctPassword(password, user.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = generateAccessToken({ id: user._id });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: 'Logged in Successful',
    data: { token },
  });
});
module.exports = {
  signup,
  signin,
};
