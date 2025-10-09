const Review = require('../Models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('../utils/httpStatus');
const factory = require('./handlerFactory');

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourID) filter = { tour: req.params.tourID };

  const reviews = await Review.find(filter, { __v: false });
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

const createReview = factory.createDoc(Review);

const updateReview = factory.updateDoc(Review);

const deleteReview = factory.delteteDoc(Review);

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
};
