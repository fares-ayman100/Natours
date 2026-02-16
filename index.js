const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const tourRoutes = require('./routes/toursRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const bookingRouutes = require('./routes/bookingRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const viewsRouters = require('./routes/viewsRouters');
const webhook = require('./controllers/bookingController');

const app = express();

// Limit requests from same API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message:
    'Too many requests from this IP, please try again in an hour!.',
  standardHeaders: 'draft-7',
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middleware
app.use(express.static(path.join(__dirname, 'public')));

//app.options('*', cors());

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Implement CORS
app.use(cors());

app.set('trust proxy', 1);

// API DOC Suger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js',
    ],
  }),
);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhook.webhookCheckout,
);

app.use('/api', limiter);

// Body parser reading the data form req.body
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Against from NoSql query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'difficulty',
      'duration',
      'maxGroupSize',
      'ratingsQuantity',
      'ratingsAverage',
    ],
  }),
);

app.use(compression());

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
app.use('/api/v1/bookings', bookingRouutes);
app.use((req, res, next) => {
  next(
    new AppError(
      `We can’t find ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

// Handler Error Middleware
app.use(errorController);

module.exports = app;
