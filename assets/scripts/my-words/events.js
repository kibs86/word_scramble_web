'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const store = require('../store.js');

// finds the ID of the word to be updated
const onFindId = function (event) {
  event.preventDefault();
  store.updateId = $(this).attr('data-word-id');
  // console.log(store.updateId);
};

// finds the difficulty of the word being created or updated
const getDifficulty = function (newWord) {
  if (newWord.length < 5) {
    return 'easy';
  } else if (newWord.length > 8) {
    return 'hard';
  } else {
    return 'medium';
  }
};

// when a user updates a word, find the new difficulty of the word and make
// the ajax call
const onUpdateWord = function (newWord) {
  let newDifficulty = getDifficulty(newWord);
  let data = { word: { word: newWord, difficulty: newDifficulty } };
  api.updateWord(data)
    .then(ui.updateWordSuccess)
    .then(function() {
      $('.update-word').on('click', onFindId);
    })
    .catch(ui.failure);
};

// when a user creates a word, find the difficulty of the word and make
// the ajax call
const onCreateWord = function (newWord) {
  // console.log('start of create new word');
  let newDifficulty = getDifficulty(newWord);
  let data = { word: { word: newWord, difficulty: newDifficulty } };
  api.createWord(data)
    .then(ui.createWordSuccess)
    .catch(ui.failure);
};

// when a user clicks to refresh words, refresh them
const onRefreshWords = function (event) {
  event.preventDefault();
  api.myWordsIndex()
       .then(ui.displayMyWords)
       .then(function() {
         $('.update-word').on('click', onFindId);
         $('.refresh-words-button').on('click', onRefreshWords);
       });
};

// checks if a word already exists
const checkWordExistence = function (newWord, type) {
  // console.log('beginning of check word existence');
  api.wordsIndex()
    .then(ui.wordsIndexSuccess)
    .then(function() {
      if (store.allWords.some(elem => elem === newWord)) {
        $('.modal-success').html('Sorry, that word already exists.  Please choose another.');
      } else {
        if (type === 'update') {
          onUpdateWord(newWord);
        } else {
          onCreateWord(newWord);
        }
      }
    })
    .catch(ui.failure);
};

// when a user submits a word to be updated, find the new word and make sure
// it hasn't been created already
const onSubmitUpdate = function (event) {
  event.preventDefault();
  let newWord = getFormFields(this).word;
  let type = 'update';
  checkWordExistence(newWord, type);
};

// when a user submits a word to be created, find the new word and make sure
// it hasn't been created already
const onSubmitCreate = function (event) {
  event.preventDefault();
  let newWord = getFormFields(this).word;
  let type = 'create';
  checkWordExistence(newWord, type);
  // console.log('end of on submit create');
};

// when a user clicks to see their words, make the api call to retrieve all
// words owned by them
const onClickMyWords = function (event) {
  event.preventDefault();
  // console.log('clicked my words');
  api.myWordsIndex()
     .then(ui.displayMyWords)
     .then(function() {
       $('.update-word').on('click', onFindId);
       $('.refresh-words-button').on('click', onRefreshWords);
       $('#hide-play-game').show();
       $('#hide-my-words').hide();
     })
     .catch(ui.failure);
};

const addHandlers = () => {
  $('.my-words-nav-button').on('click', onClickMyWords);
  $('.update-word-form').on('submit', onSubmitUpdate);
  $('.create-word-form').on('submit', onSubmitCreate);
};

module.exports = {
  addHandlers,
  onClickMyWords,
};
