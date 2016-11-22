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

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
};

module.exports = {
  addHandlers,
};
