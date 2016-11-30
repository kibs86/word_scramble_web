'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
// const store = require('../store.js');

const onFindId = function (event) {
  event.preventDefault();
  let updateId = $(this).attr('data-easy-id');
  console.log('update ID is ' + updateId);
};

const onUpdateWord = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  console.log('clicked the update word button');
  console.log(data);
};

const onClickGetMyWords = function (event) {
  event.preventDefault();
  console.log('clicked get my words button');
};

const onClickMyWords = function (event) {
  event.preventDefault();
  api.wordsIndex()
     .then(ui.displayMyWords)
     .then(function() {
       $('.get-my-words-button').on('click', onClickGetMyWords);
       $('.update-word').on('click', onFindId);
       $('.update-word-form').on('submit', onUpdateWord);
     })
     .catch(ui.failure);
  // ui.displayMyWords();
};

module.exports = {
  // addHandlers,
  onClickMyWords,
  onClickGetMyWords,
};
