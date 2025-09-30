const httpStatus = require('../utils/httpStatus');
const generateAccessToken = require('../utils/generateAccessToken');
module.exports = (user, statusCode, res, extra = {}) => {
  const token = generateAccessToken({ id: user._id });
  const cookiOptions = {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  
  res.cookie('jwt', token, cookiOptions);
  if (process.env.NODE_ENV == 'production') {
    cookiOptions.secure = true;
  }
  user.password = undefined;
  res.status(statusCode).json({
    status: httpStatus.SUCCESS,
    token,
    ...extra,
  });
};
