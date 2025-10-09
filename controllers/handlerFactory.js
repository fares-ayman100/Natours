const httpStatus = require('../utils/httpStatus');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeaturs');

const delteteDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError('No Document Found with that ID', 404),
      );
    }
    res.status(204).json({
      status: httpStatus.SUCCESS,
      data: null,
    });
  });

const createDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: httpStatus.SUCCESS,
      data: { data: newDoc },
    });
  });

const updateDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!doc) {
      return next(
        new AppError('No Document Found with that ID', 404),
      );
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: {
        data: doc,
      },
    });
  });

const getDoc = (Model, populate) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id, {
      __v: false,
    });

    if (populate) query = query.populate(populate);

    const doc = await query;
    if (!doc) {
      return next(
        new AppError('No Document Found with that ID', 404),
      );
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: { data: doc },
    });
  });

const getAllDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourID) filter = { tour: req.params.tourID };

    const featuers = new APIFeatures(
      Model.find(filter),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const docs = await featuers.query;
    res.status(200).json({
      status: httpStatus.SUCCESS,
      restult: docs.length,
      docs,
    });
  });

module.exports = {
  delteteDoc,
  createDoc,
  updateDoc,
  getDoc,
  getAllDoc,
};
