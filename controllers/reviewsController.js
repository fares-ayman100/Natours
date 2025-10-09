const Review = require('../Models/reviewsModel');
const factory = require('./handlerFactory');

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
};
