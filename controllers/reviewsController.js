const Review = require('../Models/reviewsModel');
const factory = require('./handlerFactory');

const setTourUserIds = (req, res, next) => {
  // Nested Routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getAllReviews = factory.getAllDoc(Review);

const getReview = factory.getDoc(Review);

const createReview = factory.createDoc(Review);

const updateReview = factory.updateDoc(Review);

const deleteReview = factory.delteteDoc(Review);

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
  setTourUserIds,
};
