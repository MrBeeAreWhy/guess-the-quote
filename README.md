# guess-the-quote

This application is a full stack React/Node/Express application that queries an Anime Quote database, presents information on the specific anime and prompts the user to guess the character that spoke the quote. As time progresses (each guess is given 60 seconds) additional information will be revealed about the anime and character that spoke the quote.

There are many quotes that behave erratically as the quotes are pulled from one API and the anime information is pulled from a separate API.

# Installation

Clone this repo and run

> npm i

# Running

To start in development mode, run

> npm run dev

and the server will start automatically at localhost:8080.

Alternatively,

>npm run build

followed by

> npm start

will run the application with the Express server running and serving the application.

As the application is presently incomplete, is will be necessary to navigate to localhost:3000/game for the game to display.

# To-do

- Express middleware is written to handle querying a MongoDB database to get/create users, however there is no encryption of passwords
- Session persistence via cookies/JWOT is necessary
- Login/signup pages do not have any functionality, however the server will properly serve login.html / signup.html at '/' and '/signup' respectively.
- The '/users' endpoint will display all users in the MondoDB database upon a GET request -- POST requests will add a user (per Mongoose model, username must be unique)
- Responsive styling -- currently the game is formatted to only really work in 1080p and full screen.

