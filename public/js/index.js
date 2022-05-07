/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
console.log('Hello from parcel');
import { updateData } from './updateSettings';
// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener('click', logout);
// if (userDataForm) {
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const name = document.getElementById('name').value;
//     console.log(name, email);
//     updateData(name, email);
//   });
// }
