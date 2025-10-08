const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty.'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to tour'],
    },
  },
  // to make virtual field show with another field in output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// Query Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name',
  }).populate({
    path:"user",
    select:"name photo"
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
