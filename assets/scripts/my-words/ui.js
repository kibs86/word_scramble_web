'use strict';

const showMyWordsTemplate = require('../templates/my-words.handlebars');

const displayMyWords = () => {
  $('#content').html(showMyWordsTemplate());
};

module.exports = {
  displayMyWords,
};
