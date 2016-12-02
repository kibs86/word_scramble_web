'use strict';

const store = require('../store.js');
const showGameTemplate = require('../templates/play-game.handlebars');
const showWinTemplate = require('../templates/win-game.handlebars');
const showLoseTemplate = require('../templates/lose-game.handlebars');
const showDifficultyTemplate = require('../templates/choose-difficulty.handlebars');

const hideAndClearModal = (modal) => {
  setTimeout(function() {
    $(modal).modal('hide'); }, 1000);
    $(modal).on('hidden.bs.modal', function () {
      $(this).find("input,textarea,select").val('').end();
      $('.modal-success').text('');
    });
};

// START GUESS FUNCTIONS

// check turn count
const checkTurnCount = () => {
  if (store.turnCount > 1) {
    store.turnCount--;
    $('#content').html(showGameTemplate(store));
  } else {
    console.log("Sorry, you've reached max guesses.");
    $('#content').html(showLoseTemplate());
  }
};

// check for word match
const checkMatch = (guess) => {
  if (guess.toUpperCase() === store.word.word.toUpperCase()) {
    // console.log('you guessed correctly');
    $('#content').html(showWinTemplate(store.word.word.toUpperCase()));
    return true;
  } else {
    checkTurnCount();
  }
};

// Performs actions/checks that occur when a user makes a guess
const guessMade = (guess) => {
  // check for correct answer
  if (checkMatch(guess) === true) {
    return true;
  }
};

//END GUESS FUNCTIONS

// START GET WORD FUNCTIONS

// Scramble the word that's pulled back from the API
// Uses Fisher-Yates shuffle
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

// Sometimes a word can be scrambled to itself.  This fixes that bug.
const scramble = (word) => {
	let scrambled = scrambleWord(word);
  while (scrambled === store.word.word.toUpperCase()) {
  	scrambled = scrambleWord(word);
  }
  return scrambled;
};

const getWordSuccess = (data) => {
  if (data.word.id === '') {
    $('.user-message').html("You've completed all those levels.  Please choose another difficulty.");
  } else {
    store.word = data.word;
    store.scrambled = scramble(store.word.word.toUpperCase());
    $('#content').html(showGameTemplate(store));
  }
  // console.log(data);
};
// END GET WORD FUNCTIONS


// START CHOOSE NEW DIFFICULTY FUNCTIONS
const chooseNewDifficulty = () => {
  $('#content').html(showDifficultyTemplate());
  store.turnCount = 3;
};
// END CHOOSE NEW DIFFICULTY FUNCTIONS

// START CREATE COMPLETED WORDS FUNCTIONS
const createCompletedWordSuccess = () => {
  console.log('successfully created a word');
};
// END CREATE COMPLETED WORDS FUNCTIONS

const deleteCompletedWordsSuccess = () => {
  $('.modal-success').html('Success');
  hideAndClearModal('#reset-game-modal');
};

const failure = (error) => {
  console.log('failure due to ' + error);
};

module.exports = {
  guessMade,
  getWordSuccess,
  chooseNewDifficulty,
  createCompletedWordSuccess,
  deleteCompletedWordsSuccess,
  failure,
};
