const mongoose = require('mongoose');
const express = require('express');
const tourRoutes = require('./routes/tours-routes');
const usersRoutes = require('./routes/users-routes');
const morgan = require('morgan');
const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', usersRoutes);

module.exports = app;
