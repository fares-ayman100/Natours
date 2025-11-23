const multer = require('multer');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Is not image!,Please provide image', 400),
      false,
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// upload.single => only file
// upload.array => multi file
// upload.fields => multi fields each have number file
module.exports = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);
