const Tour = require('../Models/toursModel');
const User = require('../Models/usersModel');
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
    fields: 'review rating user',
  });

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

const login = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

module.exports = {
  getOverView,
  getTour,
  login,
};
