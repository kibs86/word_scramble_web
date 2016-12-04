'use strict';

const store = require('../store.js');
const showDescriptionTemplate = require('../templates/game-description.handlebars');
const showDifficultyTemplate = require('../templates/choose-difficulty.handlebars');

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
  $('.modal-success').text("SUCCESS!");
  hideAndClearModal('#sign-up-modal');
  $('.login-message').text('');
};

// If sign in is successful, store their data and let the user know
const signInSuccess = (data) => {
  store.user = data.user;
  $('#welcome-message').text("Welcome, " + store.user.email + "!");
  toggleHideShow(['#hide-myaccount', '.sign-in-form', '#hide-signup']);
  clearForm('.sign-in-form');
  $('#content').html(showDifficultyTemplate());
};

// If user successfully changes their password, let user know
const changePasswordSuccess = () => {
  $('.modal-success').text("SUCCESS!");
  hideAndClearModal('#change-password-modal');
};

// If sign out is successful, let user know
const signOutSuccess = () => {
  $('.modal-success').text("SUCCESS!");
  $('#welcome-message').text('');
  $('.login-message').text('');
  hideAndClearModal('#sign-out-modal');
  $('#hide-play-game').hide();
  $('#hide-my-words').hide();
  toggleHideShow(['#hide-myaccount', '.sign-in-form', '#hide-signup']);
  $('#content').html(showDescriptionTemplate());
};

// If login fails, let user know.
const signInFailure = () => {
  $('.login-message').text("Login Failed: Please double check your password or sign up first.");
  clearForm('.sign-in-form');
};

// If any auth functionality (aside from login) fails, let user know
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
  signInFailure,
  failure,
};
