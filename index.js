const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/tours-routes');
const usersRoutes = require('./routes/users-routes');
const httpStatus = require('./utils/http-status');
const AppError = require('./utils/appError');
const ErrorController = require('./controllers/errorController');
const errorController = require('./controllers/errorController');
const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', usersRoutes);
app.use((req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

// Handler Error Middleware
app.use(errorController);

module.exports = app;
