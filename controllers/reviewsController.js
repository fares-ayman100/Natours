const Review = require('../Models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('../utils/httpStatus');

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({}, { __v: false });
  res.status(200).json({
    status: httpStatus.SUCCESS,
    result: reviews.length,
    data: { reviews },
  });
});

const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id, {
    __v: false,
  });
  if (!review) {
    return new AppError('Review Is Not Found', 404);
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { review },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  // Nested Routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: {
      review: newReview,
    },
  });
});

module.exports = {
  getAllReviews,
  createReview,
  getReview,
};
