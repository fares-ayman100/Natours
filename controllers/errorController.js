const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');

const handelCastErrorDB = (err) => {
  const message = `Inavalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handelDublicatErrorDB = (err) => {
  const message = `Dublicated Field value :(${err.keyValue['name']}). Please use another value`;
  return new AppError(message, 400);
};

const handelValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handelTokenInvalid = () => {
  return new AppError('Token is invalid', 401);
};

const handelTokenExpired = () => {
  return new AppError(
    'Your session has expired. Please log in again',
    401,
  );
};

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) Renders
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  //Operational Error
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    //Programming Error
    console.log('Error 💥', err);
    return res.status(500).json({
      status: 'faild',
      message: 'some thing is wrong',
    });
  }
  // B) Renders
  // Operational Error
  if (err.isOperational) {
    console.log('Error 💥', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // Programming Error
  console.log('Error 💥', err);

      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.',
      });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || httpStatus.ERROR;

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = err;
    if (error.name == 'CastError') {
      error = handelCastErrorDB(error);
    }
    if (error.code == 11000) {
      error = handelDublicatErrorDB(error);
    }
    if (error.name == 'ValidationError') {
      error = handelValidatorErrorDB(error);
    }
    if (error.name == 'JsonWebTokenError') {
      error = handelTokenInvalid();
    }
    if (error.name == 'TokenExpiredError') {
      error = handelTokenExpired();
    }
    sendErrorProd(error, req, res);
  }
};
