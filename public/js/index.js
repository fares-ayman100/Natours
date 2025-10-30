import '@babel/polyfill';
import { displayMap } from './map';
import { login } from './login';
import { logout } from './logout';
import { updateSetting } from './updateSetting';

// DOM Element
const map = document.getElementById('map');
const loginForm = document.querySelector('.form-user-login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector(
  '.form-user-settings',
);

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
if(userDataForm){
  userDataForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSetting({name,email},'Data');
  })

  if(userPasswordForm){
    userPasswordForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent='Updating...'
    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSetting({currentPassword,newPassword,passwordConfirm},'Password');
      document.querySelector('.btn--save-password').textContent="Save Password"
      document.getElementById('password-current').value='';
      document.getElementById('password').value='';
      document.getElementById('password-confirm').value='';
  })
  }
};
