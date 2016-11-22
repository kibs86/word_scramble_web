'use strict';

const store = require('../store.js');

// Hides and clears the login/sign up modals after a certain period of time
// Called from below functions
const hideAndClear = (modal) => {
  setTimeout(function() {
    $(modal).modal('hide'); }, 1000);
    $(modal).on('hidden.bs.modal', function () {
      $(this).find("input,textarea,select").val('').end();
      $('.modal-success').text('');
    });
};

// If sign up is successful, let the user know
const signUpSuccess = (data) => {
  console.log(data);
  $('.modal-success').text("SUCCESS!");
  hideAndClear('#sign-up-modal');
};

// If sign in is successful, store their data and let the user know
const signInSuccess = (data) => {
  store.user = data.user;
  $('#welcome-message').text("Welcome, " + store.user.email + "!");
  console.log(data);
};

// If user successfully changes their password, let user know
const changePasswordSuccess = (data) => {
  $('.modal-success').text("SUCCESS!");
  hideAndClear('#change-password-modal');
  console.log(data);
};

// If any login functionality fails, let user know
const failure = () => {
  $('.modal-success').text("That function failed.");
};

module.exports = {
  hideAndClear,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  failure,
};
