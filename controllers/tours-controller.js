const httpStatus = require('../utils/http-status');
const Tour = require('../Models/toursModel');
const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    //1A) Filtering
    const queryObj = { ...req.query };
    const execudedField = ['page', 'sort', 'limit', 'fields'];
    execudedField.forEach((el) => {
      delete queryObj[el];
    });

    //1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //3) Fields Limitation

    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1;
    if (!limit) {
      limit = await Tour.countDocuments();
    }
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (skip >= (await Tour.countDocuments())) {
      throw new Error('Page Is Not Found');
    }

    const tours = await query;
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
