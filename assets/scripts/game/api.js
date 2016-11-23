'use strict';

const config = require('../config.js');
// const store = require('../store.js');

// Ajax request to get a full listing of all user's games
const getEasyWord = function () {
  return $.ajax({
    url: config.host + '/easy-word',
    method: 'GET'
  });
};

module.exports = {
  getEasyWord,
};
