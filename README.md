# Introduction
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is my attempt to convert [this project](https://github.com/kentcdodds/bookshelf) into TypeScript and serves as a component for my résumé.

## Usage
Visit the [live demo](bukshelf.netlify.app), register an account and let curiosity be your guide.

## Caveats
For the main purpose of demonstrating React's modern best practices, the project uses [Mock Service Worker](https://mswjs.io) and Local Storage to emulate the backend's behavior, therefore, it won't match your expectations of a proper fullstack app.

I'm still learning [TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/) by building this project, so if you take a closer look, you'll see that I'm ignoring type checking at some of the non-critical parts of the app's functionality as well as a suppression for those cases where I have no clue of how to make TypeScript work *appropriately*. PRs are most welcome if you want to show me your approach to leverage TypeScript's power.

All of the tests are passed, but there are still [`act()` warnings](https://reactjs.org/docs/test-utils.html#act) for some of them. I tried to fix that (and I failed, obviously).
I highly doubt that there're some underlying dependency conflicts which may have been the cause. Again, if you happen to know how to deal with it, a PR is more than welcome.

# Installation
In case you want to run the app locally, make sure to have the same environment as I do to get it working properly. Please download and install these 2 softwares (if you don't have them already):
1.  **nvm-setup.zip** from its [latest release](https://github.com/coreybutler/nvm-windows/releases)
2.  [Git](https://git-scm.com/downloads)

Then open up your terminal with **Admin privilege** and run the following commands:
1. `nvm install 16.13.0` 
2. `nvm use 16.13.0` 
3. `node -v` (the output should be `v16.13.0`)
4. Pick a folder of your choice, or create an empty folder and then `cd path-to-that-folder`
5. `git clone https://github.com/HelpMe-Pls/bookshelf.git`
6. `cd bookshelf`

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm t`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cy:open`
Run this command on a **separate** terminal instance **after** having your development mode running (with `npm start`) to launch the Cypress E2E test runner. It tests the user's "happy path" as follows:
1. Arrive at the app and register.
2. Go to the discover page and search for a book.
3. Add that book to the reading list.
4. Go to the reading list and then go to the book page.
5. Add some notes.
6. Mark the book as read.
7. Give the book a 5 star rating.
8. Go to the finished books screen.
9. Verify the book shows up and has a 5 star rating.
10. Click the book to go back to it's page.
11. Remove it from the reading list.
12. Make sure the notes and rating are gone.
13. Go to the finished books screen and make sure that list is empty.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Documentation
To *quickly* learn React, check out the [React documentation](https://beta.reactjs.org/learn).
For a paid course, I highly recommend the Kent C. Dodds [Epic React course](https://epicreact.dev).
My personal preference [learning path](https://www.reactiflux.com/learning) to become a React Frontend developer.
Check out [the notes](https://github.com/HelpMe-Pls/bookshelf/blob/master/WIL.md) that I had throughout the process of building this project.

# Contributing
Pull requests are most welcome. For breaking changes suggestion, please open an issue first to discuss what you would like to change/improve.

[Contact me](https://www.facebook.com/messages/t/100005341874318) if you need further support.

