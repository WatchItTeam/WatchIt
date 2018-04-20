# WatchIt
A web app for browsing movies and TV shows. WatchIt allows you to browse movies and tv shows and add them to collections so you can keep track of what you're watching.

This app uses TheMovieDB to fetch info about movies and TV shows and is built using React.

[Check it out here](https://watchitteam.github.io/WatchIt/).

## Project details
Please see the [project details file](project-details.md).

## Run locally
Install all dependencies:
```
$ npm install
```

Start the app
```
$ npm start
```

The app will now open in your browser in `localhost:3000`.

## Build
```
$ npm run build
```
This command will compile the project and output the production ready files in the `dist` folder.

## Deploy on Github pages

1. Go to `src/index.js` and change `BrowserRouter` to `HashRouter` (necessary since Github pages is a static web host).
2. Run the command `npm run deploy` which builds the project and pushes to the `gh-pages` branch.

## API key

To be able to have a working project on your local computer you need to add the API key of TMDb to the `src/api/APIKeyPlaceholder.js` file since we will not be pushing our API key to the repository. You will also have to copy the `src/api/APIKeyPlaceholder.js` to a new file `src/api/APIkey.js` (DO NOT RENAME THE ORIGINAL FILE).

This product uses the TMDb API but is not endorsed or certified by TMDb.
