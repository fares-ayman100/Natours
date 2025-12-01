const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../Models/toursModel');
const httpStatus = require('../utils/httpStatus');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Booking = require('../Models/booking');

exports.checkoutSesstion = catchAsync(async (req, res, next) => {
  // 1) Get Tour Booking by id
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(tour.price * 100), // Convert to Cent
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `https://natours.dev/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create check session response
  res.status(200).json({
    status: httpStatus.SUCCESS,
    session,
  });
});

exports.getAllBookings = factory.getAllDoc(Booking);
exports.getOneBooking = factory.getDoc(Booking);
exports.createBooking = factory.createDoc(Booking);
exports.deleteBooking = factory.delteteDoc(Booking);
exports.updateBooking = factory.updateDoc(Booking);
