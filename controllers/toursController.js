const httpStatus = require('../utils/httpStatus');
const Tour = require('../Models/toursModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const aliasTopTours = (req, res, next) => {
  req.url =
    '/?sort=-ratingsAverage,price&fields=ratingsAverage,price,name,ratingAverage,difficulty,summary&limit=5';
  next();
};

const getAllTours = factory.getAllDoc(Tour);

const getTour = factory.getDoc(Tour, {
  path: 'reviews',
  select: '-__v',
});

const createTour = factory.createDoc(Tour);

const updateTour = factory.updateDoc(Tour);

const deleteTour = factory.delteteDoc(Tour);

const tourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: '$difficulty',
        numTour: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
    {
      $sort: {
        minPrice: 1,
      },
    },
  ]);
  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: stats });
});

const monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const month = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTour: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    {
      $project: { _id: 0 },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);
  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: month });
});

module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  aliasTopTours,
  tourStats,
  monthlyPlan,
};
