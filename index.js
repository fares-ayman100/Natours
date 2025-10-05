const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const tourRoutes = require('./routes/toursRoutes');
const usersRoutes = require('./routes/usersRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const htmlSanitize = require('./Middleware/htmlSanitize');
const mongoSanitize = require('./Middleware/querySanitize');
const app = express();

// Global Middleware

// Set security HTTP headers
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message:
    'Too many requests from this IP, please try again in an hour!.',
  standardHeaders: 'draft-7',
});
app.use('/api', limiter);

// Body parser reading the data form req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize)

// Data sanitization against XSS
app.use(htmlSanitize);

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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
