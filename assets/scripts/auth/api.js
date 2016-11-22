'use strict';

const config = require('../config.js');
// const store = require('../store.js');

// Ajax request for a new user sign up
const signUp = (data) =>
  $.ajax({
    url: config.host + '/sign-up',
    method: 'POST',
    data,
  });

// Ajax request for an existing user sign-in
const signIn = (data) =>
  $.ajax({
    url: config.host + '/sign-in',
    method: 'POST',
    data,
  });

module.exports = {
  signUp,
  signIn,
};
