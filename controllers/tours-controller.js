const httpStatus = require('../utils/http-status');
const APIFeatures = require('../utils/api-featurs');
const Tour = require('../Models/toursModel');
const aliasTopTours = (req, res, next) => {
  req.url =
    '/?sort=-ratingAverage,price&fields=ratingsAverage,price,name,ratingAverage,difficulty,summary&limit=5';
  next();
};

const getAllTours = async (req, res) => {
  try {
    const featuers = new APIFeatures(Tour.find(), req.query)
      .Filter()
      .Sort()
      .LimitFields()
      .Pagination();

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
    res.status(400).json({ status: httpStatus.FAILD, message: err });
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
    res.status(400).json({ status: httpStatus.FAILD, message: err });
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
module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  aliasTopTours,
};
