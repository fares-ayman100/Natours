const crypto = require('crypto');
const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const createSendToken = require('../utils/createSendToken');

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
  });

  createSendToken(newUser, 201, res, { data: newUser });
});

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body || {};
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

  createSendToken(user, 200, res, {
    message: 'Logged in successfuly',
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
  /api/v1/users/resetPassword/${resetToken}`;
  const message = `Forget your password? Submit a patch request with your
  new password and passwordConfirm to: ${resetURL}\n if your didn't forget
  your password ,Please ignore this email.`;

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

const resetPassword = catchAsync(async (req, res, next) => {
  // get the user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpired: { $gt: Date.now() },
  });
  // check if token is not expired and the user found set new password

  if (!user) {
    return next(
      new AppError('Invalid token or token is expired', 404),
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpired = undefined;
  await user.save();

  // set the new changePasswordAt
  // log the user in and send jwt
  if (!req.body || !req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError('Password and confirm password are required', 400),
    );
  }
  createSendToken(user, 200, res);
});

const updatedPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } =
    req.body || {};

  // 1) check inputs
  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(
      new AppError(
        'Current password, new password and passwordConfirm are required',
        400,
      ),
    );
  }

  // 2) get user with password
  const user = await User.findById(req.user.id).select('+password');

  // 3) check current password
  const isPasswordCorrect = await user.correctPassword(
    currentPassword,
    user.password,
  );
  if (!isPasswordCorrect) {
    return next(
      new AppError('The current password is incorrect', 401),
    );
  }

  // 4) check new != old
  if (currentPassword === newPassword) {
    return next(
      new AppError(
        'New password must be different from the current password',
        400,
      ),
    );
  }

  // 5) update password (only if all checks passed)
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 6) issue new token
  createSendToken(user, 200, res, { message: 'Password is Updated' });
});

module.exports = {
  signup,
  signin,
  forgetPassword,
  resetPassword,
  updatedPassword,
  
};
