const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/usersModel');
module.exports = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      //1) verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      //2) check if user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      //3) check if user change user after the token was issue
      if (currentUser.changedPassword(decoded.iat)) {
        return next();
      }
      // There is a looged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};
