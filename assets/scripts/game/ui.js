'use strict';

const store = require('../store.js');

const getEasyWordSuccess = (data) => {
  console.log(data);
  store.word = data.word;
};

const failure = (error) => {
  console.log('failure due to ' + error);
};

module.exports = {
  getEasyWordSuccess,
  failure,
};
