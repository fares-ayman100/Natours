import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51SXrS9D3ltocuR6k19oyQTheYbfebV5bsHQmRhOqieVyFKtF4APoY88cj0frVcIUZsNZbaXg6M0K8QtvyWBoMakV006Lnr60St',
  );

  try {
    // 1) Get check out Session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    // 2) redirect to checkout form
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
