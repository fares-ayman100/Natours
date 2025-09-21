const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { user: newUser },
  });
});

module.exports = {
  signup,
};
