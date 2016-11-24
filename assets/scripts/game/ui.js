'use strict';

const store = require('../store.js');

const showGameTemplate = require('../templates/play-game.handlebars');

const scrambleWord = (word) => {
  // split the word into an array
  let wordArr = word.split("");
  // loop through array
  for (let i = 0; i < wordArr.length; i++) {
    // set j equal to a random number between 0 and wordArr.length - 1
    let j = Math.floor(Math.random() * wordArr.length);
    // store the ith index of wordArr in a variable temporarily since we're about
    // to change the value of wordArr[i]
    let k = wordArr[i];
    // set the ith index of wordArr equal to the jth (random) index of wordArr
    wordArr[i] = wordArr[j];
    // set the random index of wordArr equal to the value we stored in k
    wordArr[j] = k;
  }
  return wordArr.join("");
  // console.log('scrambled word is ' + wordArr.join(""));
};

const guessMade = (guess) => {
  console.log(guess);
  if (store.turnCount > 0) {
    store.turnCount--;
  } else {
    console.log("Sorry, you've reached max guesses.");
  }
  $('#content').html(showGameTemplate(store));
};

const getEasyWordSuccess = (data) => {
  store.word = data.word;
  store.scrambled = scrambleWord(store.word.word.toUpperCase());
  $('#content').html(showGameTemplate(store));
};

const failure = (error) => {
  console.log('failure due to ' + error);
};

module.exports = {
  guessMade,
  getEasyWordSuccess,
  failure,
};
