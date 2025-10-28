import axios from 'axios';
import { showAlert } from './alerts';

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if (res.data.status == 'success') {
      showAlert('success', 'You logged out');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error Logging out ! Try again.');
  }
};
