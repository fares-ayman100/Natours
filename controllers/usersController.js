const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterdOBJ = require('../utils/filterObject');
const factory = require('./handlerFactory');

const getAllUsers = factory.getAllDoc(User);

const getUser = factory.getDoc(User);

const updateUser = factory.updateDoc(User);

const deleteUser = factory.delteteDoc(User);

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updatedMe = catchAsync(async (req, res, next) => {
  // check if user pass password in the body
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please user /updatePassword.',
        400,
      ),
    );
  }
  // filter fields
  const filterdBody = filterdOBJ(req.body, 'name', 'email');
  //Update user document
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    filterdBody,
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updateUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({ status: httpStatus.SUCCESS });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updatedMe,
  deleteMe,
  getMe,
};
