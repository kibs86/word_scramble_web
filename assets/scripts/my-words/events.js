'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const store = require('../store.js');

const onFindId = function (event) {
  event.preventDefault();
  store.updateId = $(this).attr('data-word-id');
  console.log(store.updateId);
};

const getDifficulty = function (newWord) {
  if (newWord.length < 5) {
    return 'easy';
  } else if (newWord.length > 8) {
    return 'hard';
  } else {
    return 'medium';
  }
};

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

const onCreateWord = function (newWord) {
  let newDifficulty = getDifficulty(newWord);
  let data = { word: { word: newWord, difficulty: newDifficulty } };
  api.createWord(data)
    .then(ui.createWordSuccess)
    .then(api.myWordsIndex()
         .then(ui.displayMyWords)
         .then(function() {
           $('.update-word').on('click', onFindId);
           $('.update-word-form').on('submit', onSubmitUpdate);
           $('.create-word-form').on('submit', onSubmitCreate);
         }))
    .catch(ui.failure);
};

const checkWordExistence = function (newWord, type) {
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

const onSubmitUpdate = function (event) {
  event.preventDefault();
  // find the new word and make sure it hasn't been created already
  let newWord = getFormFields(this).word;
  let type = 'update';
  checkWordExistence(newWord, type);
};

const onSubmitCreate = function (event) {
  event.preventDefault();
  let newWord = getFormFields(this).word;
  let type = 'create';
  checkWordExistence(newWord, type);
};


const onClickMyWords = function (event) {
  event.preventDefault();
  api.myWordsIndex()
     .then(ui.displayMyWords)
     .then(function() {
       $('.update-word').on('click', onFindId);
       $('.update-word-form').on('submit', onSubmitUpdate);
       $('.create-word-form').on('submit', onSubmitCreate);
       $('#hide-play-game').show();
     })
     .catch(ui.failure);
};

module.exports = {
  // addHandlers,
  onClickMyWords,
};
