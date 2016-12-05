# Word Scramble Project

## Links

The app is deployed here:<br>
https://kibs86.github.io/word_scramble_web/

The back-end repo can be found here:<br>
https://github.com/kibs86/word-scramble-api

## Description

This is a Word Scramble game.  Users can choose between Easy, Medium and Hard difficulty tiers and attempt to unscramble words from each.  They're given three attempts to unscramble a word.  If they succeed, the word is marked as completed so they won't see it again.  If they fail, it will come up again at a future point.

Words are scrambled using the [`Fisher-Yates Shuffle`](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm (adapted to JavaScript) and retrieved randomly from the API based on the difficulty the user choose and whether or not they've completed the word.

Users are given the opportunity to delete their game state (remove all of their completed words) using My Account in the navbar.

Users also have the ability to create and update their own words using the My Words interface within the application.  When a word is created, the difficulty is automatically determined based on word length.  A check is also done to see whether the word exists already or not.  There is currently no check to make sure the word is a true dictionary words (see Future Enhancements).

## Approach
To start, I created wireframes and a series of user stories (both of which can be seen further down in this Readme).  I then focused on building out the basic UI and the authentication portion.  After that, I worked on the API and then on the front-end functionality that would be interacting with the API.  I had a fellow classmate play test the game as well which helped in spotting a few bugs that I had missed during my own testing.

Some of the feedback I receieved on my the Tic-Tac-Toe game was about the UI and how it wasn't very intuitive so that was something I really tried to focus on with this game.  Aside from providing the user with some instructions before they log in, I tried to only show the components that the user would need throughout each aspect of the game.  For example, when the user logs in they'll no longer see the login/signup options, but a My Account dropdown will appear.

To help with making the game more intuitive I used handlebars.  This made it simple to load different templates depending on what I wanted the user to see at different points during the game.  The parts of the page that are static (navbar, title, etc.) were created using Booststrap.  I also used Boostrap modals for the forms within the application.

### CRUD and User-Owned Data
My CRUD actions are: <br>
- **Create -** Users can create their own words.  Completed words are also created when a user successfully unscrambles a word.
- **Retrieve -** Users can retrieve the list of words they've created.  A full list of all words is also retrieved to run checks on create/update words to ensure they don't already exist.
- **Update -** Users can update the words they've created.
- **Delete -** Users can delete their game state, meaning all of their Completed Words are removed.

Data is user-owned, meaning that a user is assigned to a word or a completed word when its created and only that user can update or delete it moving forward.

### Technologies Used
**UI -** HTML, SCSS, Bootstrap, Handlebars <br>
**Front-end Functionality -** JavaScript, jQuery, Ajax <br>
**Back-end -** Ruby on Rails, PostgreSQL <br>
**Version Control -** git <br>
**Deployments -** gh-pages (front-end) and Heroku (back-end)

### Future Enhancements
The largest enhancement I have planeed for the future is communication to an external dictionary API.  This would prevent spelling errors and ensure that all words within the game are legitimate words.

I would also like to provide the user with some game statistics so they can see how many levels within each difficulty tier they've completed and be able to choose which levels they want to play instead of having the words appear at random.

### User Stories

I used Trello for my User Stories.  I had some stories initially, but added to them as I came across things that I had missed during the planning phases of the project.  Each User Story has a checklist tied to it with the tasks required to complete each story.  My user stories can be viewed here:

[`Word Scramble - User Stories`](https://trello.com/b/7v6s4mw1/word-scramble)

### Wireframes and ERD
I used Lucid Chart to develop my wireframes and ERD.  The album can be viewed on imgur:

[`Word Scramble - Wireframes and ERD`](http://imgur.com/a/JYICZ)
