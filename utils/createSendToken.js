const httpStatus = require('../utils/httpStatus');
const generateAccessToken = require('../utils/generateAccessToken');
module.exports = (user, statusCode, res, extra = {}) => {
  const token = generateAccessToken({ id: user._id });

  res.status(statusCode).json({
    status: httpStatus.SUCCESS,
    token,
    ...extra,
  });
};
