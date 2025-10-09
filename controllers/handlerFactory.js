const httpStatus = require('../utils/httpStatus');
const catchAsync = require('../utils/catchAsync');
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
      return next(new AppError('Tour Is Not Found', 404));
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: {
        data: doc,
      },
    });
  });



module.exports = {
  delteteDoc,
  createDoc,
  updateDoc,
};
