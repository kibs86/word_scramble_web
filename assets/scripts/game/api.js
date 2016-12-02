'use strict';

const config = require('../config.js');
const store = require('../store.js');

// Ajax request for getting a new word to scramble
const getWord = function () {
  return $.ajax({
    url: config.host + '/get-word/' + store.difficulty,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax request to create a completed word when a user guesses it successfully
const createCompletedWord = function (data) {
  return $.ajax({
    url: config.host + '/completed_words',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax request to delete all completed words for the current user when
// they choose to reset their game
const deleteCompletedWords = function (){
  return $.ajax({
    url: config.host + '/completed_words/destroy_all',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

module.exports = {
  getWord,
  createCompletedWord,
  deleteCompletedWords,
};
