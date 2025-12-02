import '@babel/polyfill';
import { displayMap } from './map';
import { login } from './login';
import { logout } from './logout';
import { updateSetting } from './updateSetting';
import { bookTour } from './stripe';

// DOM Element
const map = document.getElementById('map');
const loginForm = document.querySelector('.form-user-login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector(
  '.form-user-settings',
);
const bookBtn = document.getElementById('book-tour');

// Deligate
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append(
      'photo',
      document.getElementById('photo').files[0],
    );

    updateSetting(form, 'data');
  });

  if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent =
        'Updating...';
      const currentPassword = document.getElementById(
        'password-current',
      ).value;
      const newPassword =
        document.getElementById('password').value;
      const passwordConfirm = document.getElementById(
        'password-confirm',
      ).value;
      await updateSetting(
        { currentPassword, newPassword, passwordConfirm },
        'Password',
      );
      document.querySelector('.btn--save-password').textContent =
        'Save Password';
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
    });
  }
}
if (bookBtn) {
  bookBtn.addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
  });
}