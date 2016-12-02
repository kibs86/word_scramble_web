'use strict';

const showMyWordsTemplate = require('../templates/my-words.handlebars');
const store = require('../store.js');

// Hides and clears modals after a certain period of time
// Called from below functions
const hideAndClearModal = (modal) => {
  setTimeout(function() {
    $(modal).modal('hide'); }, 1000);
    $(modal).on('hidden.bs.modal', function () {
      $(this).find("input,textarea,select").val('').end();
      $('.modal-success').text('');
    });
};

// shows the handlebars template for displaying words owned by current user
const displayMyWords = (data) => {
  $('#content').html(showMyWordsTemplate(data));
  // console.log('end of display my words');
};

// when full list of words (owned by all users) is retrieved from API, save
// it in array
const wordsIndexSuccess = (data) => {
  store.allWords = [];
  for (let i = 0; i < data.words.length; i++) {
    store.allWords.push(data.words[i].word);
  }
  // console.log('end of words index success');
};

// when a word is successfully updated, hide/clear the modal and show updated
// list of users words
const updateWordSuccess = (data) => {
  $('.modal-success').html('Success');
  hideAndClearModal('#update-word-modal');
  $('#content').html(showMyWordsTemplate(data));
};

// when a word is successfully created, hide/clear the modal and show updated
// list of users words
const createWordSuccess = () => {
  $('.modal-success').html('Success');
  hideAndClearModal('#create-word-modal');
  // console.log('end of create word success');
};

// used for testing purposes
const failure = (error) => {
  // console.log('failure due to ' + error);
};

module.exports = {
  displayMyWords,
  wordsIndexSuccess,
  updateWordSuccess,
  createWordSuccess,
  failure,
};
