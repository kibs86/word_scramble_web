'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const myWords = require('../my-words/events.js');
const store = require('../store.js');

const createCompletedWordData = () => {
  return { completed_word: { user_id: store.user.id, word_id: store.word.id }};
};

const onPlayAgain = function (event) {
  event.preventDefault();
  ui.playAgain();
  $('.diff-button').on('click', onChooseDifficulty);
  $('.my-words-button').on('click', myWords.onClickMyWords);
};

const onMakeGuess = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  if (ui.guessMade(data.guess) === true) {
    let data = createCompletedWordData();
    console.log(data);
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
    .catch(ui.failure)
};

module.exports = {
  // addHandlers,
  onChooseDifficulty,
};
