const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
module.exports = catchAsync(async (req, res, next) => {
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
  if (!token || token == 'null') {
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
