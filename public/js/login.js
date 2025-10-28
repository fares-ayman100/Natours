import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  console.log(email, password);
  try {
    await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signin',
      data: {
        email,
        password,
      },
    });
    showAlert('success', 'Logged in successfully!');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (error) {
    showAlert('error', error.response?.data?.message);
  }
};
