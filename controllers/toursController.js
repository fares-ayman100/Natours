const httpStatus = require('../utils/http-status');
const APIFeatures = require('../utils/api-featurs');
const Tour = require('../Models/toursModel');
const aliasTopTours = (req, res, next) => {
  req.url =
    '/?sort=-ratingsAverage,price&fields=ratingsAverage,price,name,ratingAverage,difficulty,summary&limit=5';
  next();
};

const getAllTours = async (req, res) => {
  try {
    const featuers = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const tours = await featuers.query;
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, restult: tours.length, tours });
  } catch (err) {
    res.status(404).json({
      status: httpStatus.FAILD,
      message: err.message,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: httpStatus.SUCCESS, data: { tour } });
  } catch (err) {
    res.status(404).json({ status: httpStatus.FAILD, message: err });
  }
};
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res
      .status(201)
      .json({ status: httpStatus.SUCCESS, data: { tour: newTour } });
  } catch (err) {
    res
      .status(400)
      .json({ status: httpStatus.FAILD, message: err.message });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: httpStatus.SUCCESS, data: { tour } });
  } catch (err) {
    res
      .status(400)
      .json({ status: httpStatus.FAILD, message: err.message });
  }
};
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: httpStatus.SUCCESS, data: null });
  } catch (err) {
    res.status(400).json({ status: httpStatus.FAILD, tour: err });
  }
};
const tourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({ status: httpStatus.FAILD, message: err.message });
  }
};
const monthlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res
      .status(404)
      .json({ status: httpStatus.FAILD, message: err.message });
  }
};
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
