const httpStatus = require('../utils/httpStatus');
const generateAccessToken = require('../utils/generateAccessToken');
module.exports = (user, statusCode, req, res) => {
  const token = generateAccessToken({ id: user._id });
  const cookieOption = {
    maxAge:
      process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production')
    cookieOption.secure = true;

  res.cookie('jwt', token, cookieOption);

  user.password = undefined;
  res.status(statusCode).json({
    status: httpStatus.SUCCESS,
    token,
    data: {
      user,
    },
  });
};
