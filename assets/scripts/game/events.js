'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const myWords = require('../my-words/events.js');
const store = require('../store.js');

const createCompletedWordData = () => {
  //return { completed_word: { user_id: store.user.id, word_id: store.word.id }};
  return { completed_word: { word_id: store.word.id }};
};

const onPlayAgain = function (event) {
  event.preventDefault();
  ui.playAgain();
  $('.diff-button').on('click', onChooseDifficulty);
  $('.my-words-button').on('click', myWords.onClickMyWords);
  $('#hide-play-game').hide();
};

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
   $('.play-again-button').on('click', onPlayAgain);
};

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

const onResetGame = function (event) {
  event.preventDefault();
  api.deleteCompletedWords()
    .then(ui.deleteCompletedWordsSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('.play-again-button').on('click', onPlayAgain);
  $('.reset-game-form').on('submit', onResetGame);
};

module.exports = {
  addHandlers,
  onChooseDifficulty,
};
