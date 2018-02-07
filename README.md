[![Build Status](https://travis-ci.org/rosatolen/LeanStraTreegery.svg?branch=master)](https://travis-ci.org/rosatolen/LeanStraTreegery)

Coding in this repository depends on npm (the JavaScript package manager).

# Install Dependencies
For web app tests on OSX High Sierra, you'll want to install [Watchman](https://facebook.github.io/watchman/docs/install.html). Watchman allows the Jest test runner to run continuously in the background and run the tests whenever a source file is changed. The easiest way is with `brew install watchman`.

First, install the server dependencies with `npm install`

Next, `cd app` and install the app dependencies with `npm install`

# Run Tests
Server-side tests: from the project root, run `npm test`

React app test: from the app directory, run `npm test`
# Start the App Locally
To start the server, run `npm start` from the project root. This will serve the app at `localhost:5000`

If only making changes to the app, it's faster to run `npm start` from the app directory. Changes in the app directory will automatically get picked up and run.