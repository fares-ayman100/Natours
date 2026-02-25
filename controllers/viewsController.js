const Booking = require('../Models/booking');
const Tour = require('../Models/toursModel');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

const getOverView = catchAsync(async (req, res, next) => {
  // 1) Get The Tours Data from collection
  const tours = await Tour.find();
  // 2) Build The Templete
  // 3) Render The Templet with Data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  // Get the data of the tour requested with guides and reviews
  const tour = await Tour.findOne({
    slug: req.params.slug,
  }).populate({
    path: 'reviews',
    select: 'review rating user',
    populate: {
      path: 'user',
      select: 'name photo',
    },
  });

  if (!tour) {
    return next(
      new AppError('There is no tour with that name.', 404),
    );
  }

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

const getMyBooking = catchAsync(async (req, res) => {
  const myBooking = await Booking.find({ user: req.user.id });
  const toursIds = myBooking.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: toursIds } });
  res.status(200).render('overview', {
    title: 'My Bookings',
    tours,
  });
});

const getLoginUser = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

const getSignupUser = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up ',
  });
};

const alert = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      'Your booking was successful! Please check your email for confirmatino.';
  next();
};

module.exports = {
  getOverView,
  getTour,
  getLoginUser,
  getSignupUser,
  getAccount,
  getMyBooking,
  alert,
};
