const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateAccessToken = require('../utils/generateAccessToken');
const sendEmail = require('../utils/email');
const email = require('../utils/email');

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
const forgetPassword = catchAsync(async (req, res, next) => {
  // get user by post email
  if (!req.body || !req.body.email) {
    return next(new AppError('Please provide your email', 400));
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError('There is no user with email address', 404),
    );
  }

  // generate the random reset token
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // send email
  const resetURL = `${req.protocol}://${req.get('host')}
  // /api/v1/users/resetPassword/${resetToken}`;
  const message = `Forget your password? Submit a pathc request with your
  new password and passwordConfirm to: ${resetURL}\n if your didn't forget
  your password ,Please ignore this email .`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: 'Token sent to email',
    });
  } catch (err) {
    (user.passwordResetToken = undefined),
      (user.passwordResetTokenExpired = undefined);
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending email ,Try agin later!',
        500,
      ),
    );
  }
});
const resetPassword = catchAsync(async (req, res, next) => {});

module.exports = {
  signup,
  signin,
  forgetPassword,
  resetPassword,
};
