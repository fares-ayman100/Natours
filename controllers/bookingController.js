const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../Models/toursModel');
const httpStatus = require('../utils/httpStatus');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Booking = require('../Models/booking');
const { create } = require('../Models/usersModel');
const User = require('../Models/usersModel');

exports.checkoutSesstion = catchAsync(async (req, res, next) => {
  // 1) Get Tour Booking by id
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}`,
    //success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,

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

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne(session.customer_email)).id;
  const price =
    session.line_items[0].price_data.unit_amount / 100;
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.WEBHOOK_SIGNATURE_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (event.type === 'checkout.session.complete')
    createBookingCheckout(event.data.object);
  res.status(200).json({ received: true });
};


exports.getAllBookings = factory.getAllDoc(Booking);
exports.getOneBooking = factory.getDoc(Booking);
exports.createBooking = factory.createDoc(Booking);
exports.deleteBooking = factory.delteteDoc(Booking);
exports.updateBooking = factory.updateDoc(Booking);
