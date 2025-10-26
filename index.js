const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const tourRoutes = require('./routes/toursRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const htmlSanitize = require('./Middleware/htmlSanitize');
const mongoSanitize = require('./Middleware/querySanitize');
const viewsRouters = require('./routes/viewsRouters');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'img-src': ["'self'", '*.openstreetmap.org'],
    },
  }),
);
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
app.use(mongoSanitize);

// Data sanitization against XSS
app.use(htmlSanitize);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes

// To server side rendering
app.use('/', viewsRouters);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
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
