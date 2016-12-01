'use strict';

const config = require('../config.js');
const store = require('../store.js');

const myWordsIndex = function () {
  return $.ajax({
    url: config.host + '/words/?restrict=true',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

const wordsIndex = function () {
  return $.ajax({
    url: config.host + '/words',
    method: 'GET'
  });
};

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
