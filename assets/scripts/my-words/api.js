'use strict';

const config = require('../config.js');
const store = require('../store.js');

// Ajax call to get a full list of words owned by current user
const myWordsIndex = function () {
  return $.ajax({
    url: config.host + '/words/?restrict=true',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax call to get a full list of words created by all users
const wordsIndex = function () {
  return $.ajax({
    url: config.host + '/words',
    method: 'GET'
  });
};

// Ajax call to allow user to update one of the words they've created
const updateWord = function (data) {
  return $.ajax({
    url: config.host + '/words/' + store.updateId,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// Ajax call to allow user to create a new word
const createWord = function (data) {
  return $.ajax({
    url: config.host + '/words',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

module.exports = {
  myWordsIndex,
  wordsIndex,
  updateWord,
  createWord,
};
