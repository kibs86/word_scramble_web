'use strict';

const api = require('./api');
const ui = require('./ui');

const onChooseDifficulty = function (event) {
  event.preventDefault();
  if ($(this).attr('id') === 'easy') {
    console.log('easy button clicked');
    api.getEasyWord()
      .then(ui.getEasyWordSuccess)
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
