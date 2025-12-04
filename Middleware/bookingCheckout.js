const catchAsync = require('../utils/catchAsync');
const Booking = require('../Models/booking');

// exports.creatBookingCheckout = catchAsync(
//   async (req, res, next) => {
//     const { tour, user, price } = req.query;
//     if (!tour && !user && !price) return next();
//     await Booking.create({ tour, user, price });
//     res.redirect(req.originalUrl.split('?')[0]);
//   },
// );
