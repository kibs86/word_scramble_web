'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
const authEvents = require('./auth/events.js');
const gameEvents = require('./game/events.js');
const showDescriptionTemplate = require('./templates/game-description.handlebars');

// use require without a reference to ensure a file is bundled
// require('./example');

// hide myAccount when page first loads
$('#hide-myaccount').hide();
$('#hide-play-game').hide();

// load the game description template
$('#content').html(showDescriptionTemplate());

// $('#hide-signup').hide();
$(()=>{
  // event handlers for login API
  authEvents.addHandlers();
  gameEvents.addHandlers();

  // clear out form data if user closes form instead of hitting submit
  $(".reset, .close").click(function() {
      $("input").val("");
  });
});
