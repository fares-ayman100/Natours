const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/tours-routes');
const usersRoutes = require('./routes/users-routes');
const httpStatus = require('./utils/http-status');
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
  res.status(404).json({
    status: httpStatus.FAILD,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
