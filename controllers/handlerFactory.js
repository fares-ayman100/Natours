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

module.exports = {
  delteteDoc,
};
