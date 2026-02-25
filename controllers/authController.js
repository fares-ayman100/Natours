const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const sendToken = (user, statusCode, res, sendUser = true) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  const cookieOption = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOption.secure = true;
    cookieOption.sameSite = 'none';
  }

  res.cookie('jwt', token, cookieOption);

  user.password = undefined;
  const response = {
    status: httpStatus.SUCCESS,
    token,
  };
  if (sendUser) response.data = { user };

  res.status(statusCode).json(response);
};

const protect = catchAsync(async (req, res, next) => {
  //1) check pass token
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token || token === 'loggedout') {
    return next(
      new AppError(
        'You are not logged in! Please log in to get access.',
        401,
      ),
    );
  }

  //2) verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  //3) check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('User no longer exists. Please sign up', 401),
    );
  }

  //4) check if user change user after the token was issue
  if (currentUser.changedPassword(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password! Please login again.',
        401,
      ),
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'Your do not have permission to perform this action',
          403,
        ),
      );
    }
    next();
  };
};

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
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  sendToken(newUser, 201, res);
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

  sendToken(user, 200, res, false);
});

const logOut = (req, res) => {
  const cookieOption = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOption.secure = true;
    cookieOption.sameSite = 'none';
  }
  res.cookie('jwt', 'loggedout', cookieOption);
  res.status(200).json({ status: httpStatus.SUCCESS });
};

// Only for rendered pages, no errors!
const isLoggedIN = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      //1) verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      //2) check if user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      //3) check if user change user after the token was issue
      if (currentUser.changedPassword(decoded.iat)) {
        return next();
      }
      // There is a looged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

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
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendResetPassword();
    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: 'Token sent to email',
    });
  } catch (err) {
    ((user.passwordResetToken = undefined),
      (user.passwordResetTokenExpired = undefined));
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
  sendToken(user, 200, res, false);
});

const updatedPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } =
    req.body || {};

  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(
      new AppError(
        'Current password, new password and passwordConfirm are required',
        400,
      ),
    );
  }

  const user = await User.findById(req.user.id).select('+password');

  const isPasswordCorrect = await user.correctPassword(
    currentPassword,
    user.password,
  );

  if (!isPasswordCorrect) {
    return next(
      new AppError('The current password is incorrect', 401),
    );
  }

  if (currentPassword === newPassword) {
    return next(
      new AppError(
        'New password must be different from the current password',
        400,
      ),
    );
  }

  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  sendToken(user, 200, res, false);
});

module.exports = {
  signup,
  signin,
  logOut,
  forgetPassword,
  resetPassword,
  updatedPassword,
  sendToken,
  protect,
  restrictTo,
  isLoggedIN,
};
