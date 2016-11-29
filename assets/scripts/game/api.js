'use strict';

const config = require('../config.js');
const store = require('../store.js');

// Ajax request to get an easy word
const getEasyWord = function () {
  return $.ajax({
    url: config.host + '/easy-word',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax request to create a completed word
const createCompletedWord = function () {
  return $.ajax({
    url: config.host + '/completed_words',
    method: 'POST',
    data: {
      completed_word: {
        user_id: store.user.id,
        easy_word_id: store.word.id
      }
    },
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

module.exports = {
  getEasyWord,
  createCompletedWord,
};
