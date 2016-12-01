'use strict';

const showMyWordsTemplate = require('../templates/my-words.handlebars');
const store = require('../store.js');

const hideAndClearModal = (modal) => {
  setTimeout(function() {
    $(modal).modal('hide'); }, 1000);
    $(modal).on('hidden.bs.modal', function () {
      $(this).find("input,textarea,select").val('').end();
      $('.modal-success').text('');
    });
};

const displayMyWords = (data) => {
  $('#content').html(showMyWordsTemplate(data));
};

const wordsIndexSuccess = (data) => {
  store.allWords = [];
  for (let i = 0; i < data.words.length; i++) {
    store.allWords.push(data.words[i].word);
  }
};

const updateWordSuccess = (data) => {
  $('.modal-success').html('Success');
  hideAndClearModal('#update-word-modal');
  $('#content').html(showMyWordsTemplate(data));
};

const createWordSuccess = (data) => {
  $('.modal-success').html('Success');
  hideAndClearModal('#create-word-modal');
  $('#content').html(showMyWordsTemplate(data));
};

const failure = (error) => {
  console.log('failure due to ' + error);
};

module.exports = {
  displayMyWords,
  wordsIndexSuccess,
  updateWordSuccess,
  createWordSuccess,
  failure,
};
