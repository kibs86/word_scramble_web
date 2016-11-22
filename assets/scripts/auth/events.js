'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

// Allows a new user to sign up
// Make sure their password and password confirmation are the same.
const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.failure);
  } else {
    $('.modal-success').text("Please make sure your passwords are the same.");
  }
};

// Allows an existing user to login
const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
     .then(ui.signInSuccess)
     .catch(ui.failure);
};

// Allows a user to change their password
// Make sure new password is different than old password
const onChangePassword = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  if (data.passwords.old === data.passwords.new) {
    $('.modal-success').text("Your old password and new password must be different.");
  } else {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.failure);
  }
};

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
};

module.exports = {
  addHandlers,
};
