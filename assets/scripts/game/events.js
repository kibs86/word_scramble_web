'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const myWords = require('../my-words/events.js');
const store = require('../store.js');

// creates the data to send to the ajax call for creating a completed word
const createCompletedWordData = () => {
  return { completed_word: { word_id: store.word.id }};
};

// allows the user to choose a new difficulty when they're playing the game
const onChooseNewDifficulty = function (event) {
  event.preventDefault();
  ui.chooseNewDifficulty();
  $('.diff-button').on('click', onChooseDifficulty);
  $('.my-words-diff-button').on('click', myWords.onClickMyWords);
  $('#hide-play-game').hide();
  $('#hide-my-words').hide();
};

// when a user makes a guess, check to see if they're correct
// if they are, create a completed word
const onMakeGuess = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  if (ui.guessMade(data.guess) === true) {
    let data = createCompletedWordData();
    api.createCompletedWord(data)
       .then(ui.createCompletedWordSuccess)
       .catch(ui.failure);
   }
   $('.guess-form').on('submit', onMakeGuess);
   $('.new-difficulty-button').on('click', onChooseNewDifficulty);
   $('.next-word-button').on('click', onNextWord);
};

// give a user another word of their selected difficulty tier
const onNextWord = function (event) {
  event.preventDefault();
  $('#hide-my-words').hide();
  api.getWord()
    .then(ui.getWordSuccess)
    .then(function() {
      $('.guess-form').on('submit', onMakeGuess);
    })
    .catch(ui.failure);
};

// get a word of the difficulty tier that the user chooses
const onChooseDifficulty = function (event) {
  event.preventDefault();
  store.difficulty = $(this).attr('id');
  api.getWord()
    .then(ui.getWordSuccess)
    .then(function() {
      $('.guess-form').on('submit', onMakeGuess);
    })
    .catch(ui.failure);
};

// issue request to delete all completed words associated with the current user
const onResetGame = function (event) {
  event.preventDefault();
  api.deleteCompletedWords()
    .then(ui.deleteCompletedWordsSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('.new-difficulty-button').on('click', onChooseNewDifficulty);
  $('.next-word-button').on('click', onNextWord);
  $('.reset-game-form').on('submit', onResetGame);
};

module.exports = {
  addHandlers,
  onChooseDifficulty,
};
