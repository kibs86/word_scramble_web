'use strict';

const config = require('../config.js');
const store = require('../store.js');

const getWord = function () {
  return $.ajax({
    url: config.host + '/get-word/' + store.difficulty,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax request to create a completed word
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

const deleteCompletedWords = function (){
  return $.ajax({
    url: config.host + '/completed_words/1',
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
