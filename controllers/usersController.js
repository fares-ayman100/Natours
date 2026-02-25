const multer = require('multer');
const sharp = require('sharp');
const httpStatus = require('../utils/httpStatus');
const User = require('../Models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../public/img/users/${req.file.filename}`);
  next();
});

const filterdOBJ = (obj, ...allawedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allawedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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
  if (req.file) filterdBody.photo = req.file.filename;
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
  uploadUserPhoto,
  resizeUserPhoto,
};
