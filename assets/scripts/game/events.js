'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
// const store = require('../store.js');

const onPlayAgain = function (event) {
  event.preventDefault();
  ui.playAgain();
};

const onMakeGuess = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  ui.guessMade(data.guess);
  $('.guess-form').on('submit', onMakeGuess);
  $('#play-again-button').on('click', onPlayAgain);
};

const onChooseDifficulty = function (event) {
  event.preventDefault();
  if ($(this).attr('id') === 'easy') {
    console.log('easy button clicked');
    api.getEasyWord()
      .then(ui.getEasyWordSuccess)
      .then(function() {
         $('.guess-form').on('submit', onMakeGuess);
       })
      .catch(ui.failure);
  } else if ($(this).attr('id') === 'medium') {
    console.log('medium button clicked');
  } else {
    console.log('hard button clicked');
  }
};

// const addHandlers = () => {
//
// };

module.exports = {
  // addHandlers,
  onChooseDifficulty,
};
