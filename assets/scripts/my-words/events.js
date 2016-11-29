'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);
//
// const api = require('./api');
const ui = require('./ui');
// const store = require('../store.js');

const onClickMyWords = function (event) {
  event.preventDefault();
  ui.displayMyWords();
  console.log('clicked my words button');
};

module.exports = {
  // addHandlers,
  onClickMyWords,
};
