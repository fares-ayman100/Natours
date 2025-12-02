import axios from 'axios';
import { showAlert } from './alerts';

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status == 'success') {
      showAlert('success', 'You logged out');
      location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error Logging out ! Try again.');
  }
};
