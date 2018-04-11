# WatchIt
A web app for browsing movies and TV shows.

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

## API key

To be able to have a working project on your local computer you need to add the API key of TMDb to the src/api/APIKeyPlaceholder.js file since we will not be pushing our API key to the repository. You will also have to rename the src/api/APIKeyPlaceholder.js to src/api/APIKey.js.
