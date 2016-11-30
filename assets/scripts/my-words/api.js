'use strict';

const config = require('../config.js');
const store = require('../store.js');

const wordsIndex = function () {
  return $.ajax({
    url: config.host + '/easy_words',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

module.exports = {
  wordsIndex,
};
