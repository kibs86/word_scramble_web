'use strict';

const showMyWordsTemplate = require('../templates/my-words.handlebars');

const displayMyWords = (data) => {
  console.log(data);
  // let newData = JSON.stringify(data.easy_words, null, '\t');
  // console.log(newData);
  $('#content').html(showMyWordsTemplate(data));
};

const wordsIndexSuccess = (data) => {
  console.log(data);
};

module.exports = {
  displayMyWords,
  wordsIndexSuccess,
};
