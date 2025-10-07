const Review = require('../Models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('../utils/httpStatus');

const getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({}, { __v: false });
  res.status(200).json({
    status: httpStatus.SUCCESS,
    result: reviews.length,
    data: { reviews },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: {
      review: newReview,
    },
  });
});

module.exports = {
  getReviews,
  createReview,
};
