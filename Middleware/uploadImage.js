const multer = require('multer');
const AppError = require('../utils/appError');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];

//     cb(null, `user-${req.user.id}-${Date.now()}-.${ext}`);
//   },
// });
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
module.exports = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
//module.exports = upload;
