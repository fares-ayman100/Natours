const httpStatus = require('../utils/httpStatus');
const APIFeatures = require('../utils/apiFeaturs');
const Tour = require('../Models/toursModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const aliasTopTours = (req, res, next) => {
  req.url =
    '/?sort=-ratingsAverage,price&fields=ratingsAverage,price,name,ratingAverage,difficulty,summary&limit=5';
  next();
};

const getAllTours = catchAsync(async (req, res, next) => {
  const featuers = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const tours = await featuers.query;
  res.status(200).json({
    status: httpStatus.SUCCESS,
    restult: tours.length,
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError('Tour Is Not Found', 404));
  }
  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { tour } });
});

const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { tour: newTour } });
});

const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError('Tour Is Not Found', 404));
  }
  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { tour } });
});

const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('Tour Is Not Found', 404));
  }
  res.status(200).json({ status: httpStatus.SUCCESS, data: null });
});

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
  res.status(200).json({ status: httpStatus.SUCCESS, data: stats });
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
  res.status(200).json({ status: httpStatus.SUCCESS, data: month });
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
