'use strict';

const store = require('../store.js');

// Hides and clears the login/sign up modals after a certain period of time
// Called from below functions
const hideAndClearModal = (modal) => {
  setTimeout(function() {
    $(modal).modal('hide'); }, 1000);
    $(modal).on('hidden.bs.modal', function () {
      $(this).find("input,textarea,select").val('').end();
      $('.modal-success').text('');
    });
};

// Toggles hiding and showing of items on page
// Takes an array of selectors and toggles them all
const toggleHideShow = (selectors) => {
  for (let i = 0; i < selectors.length; i++) {
    $(selectors[i]).toggle();
  }
};

// Just used to clear the login form
const clearForm = (selector) => {
  $(selector).find("input,textarea,select").val('').end();
};

// If sign up is successful, let the user know
const signUpSuccess = () => {
  // console.log(data);
  $('.modal-success').text("SUCCESS!");
  hideAndClearModal('#sign-up-modal');
};

// If sign in is successful, store their data and let the user know
const signInSuccess = (data) => {
  store.user = data.user;
  $('#welcome-message').text("Welcome, " + store.user.email + "!");
  toggleHideShow(['#hide-myaccount', '.sign-in-form', '#hide-signup']);
  clearForm('.sign-in-form');
  // console.log(data);
};

// If user successfully changes their password, let user know
const changePasswordSuccess = () => {
  $('.modal-success').text("SUCCESS!");
  hideAndClearModal('#change-password-modal');
  // console.log(data);
};

// If sign out is successful, let user know
const signOutSuccess = () => {
  $('.modal-success').text("SUCCESS!");
  $('#welcome-message').text('');
  hideAndClearModal('#sign-out-modal');
  toggleHideShow(['#hide-myaccount', '.sign-in-form', '#hide-signup']);
};

// If any login functionality fails, let user know
const failure = () => {
  $('.modal-success').text("That function failed.");
};

module.exports = {
  hideAndClearModal,
  toggleHideShow,
  clearForm,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure,
};
