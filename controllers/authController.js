const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateAccessToken = require('../utils/generateAccessToken');

const signup = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(new AppError('Email Is Already Exist', 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
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
const protect = catchAsync(async (req, res, next) => {
  //1) check pass token
  let token;
  if (req.headers && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Please Login and try again'));
  }

  //2) verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  //3) check if user still exist
  const checkUser = await User.findById(decoded.id);
  if (!checkUser) {
    return next(new AppError('User Is not longer exist'));
  }

  //4) check if user change user after the token was issue
  if (checkUser.changedPassword(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password! Please login again.',
        401,
      ),
    );
  }
  req.user=checkUser

  next();
});
module.exports = {
  signup,
  signin,
  protect,
};
