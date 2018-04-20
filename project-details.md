# Project details
Updated April 20th

## What has been done
* Custom Webpack setup, Babel, ESLint, Sass
* Initial layout
    * Responsive sidebar which turns into a slideout menu on mobile
    * Responsive grid layouts for movies and tv shows
* Integration with TheMovieDB API
    * The homepage fetches currently playing movies and now airing TV shows.
    * Fully functioning search system with infinte scroll for loading more results.
    * The movie details page fetches movie info including data such as rating, runtime, cast, trailers, etc.

For more details, feel free to check the closed issues in our issue tracker

## What we plan to do
* Finish up the movie details page
    * Layout is not fully done
    * Not responsive
* Implement tv details page (will have same layout as the movie details page, just need to adapt to the correct API call)
* Implement Browse Movies page (currently in progress)
    * Used to browse top rated films, upcoming, genres, etc
* Implement Browse TV Shows page
    * Same functionality as the Browse Movies page
    * Same layout, so only need to adapt to the right API call
* Finish account system (currently in progress)
* Add Firebase (currently in progress)
    * User lists/collections
* Drag and drop for adding to lists (already figured out how to do this, can be easily implemented once the list system is done)
* General improvements
    * Ensure loading indicators and errors appear where appropriate.

## Project file structure
This project's structure is inspired from `create-react-app`.

Our static files (e.g. HTML files) are in `public/` whereas JS and CSS are located in `src/`.

In there we have separated our files depending on their roles.

* Stateless reusable components go in `src/components`
    * Too many files to individually list here, but each file contains a short description of its purpose, and their names should hopefully make it clear too.
* Components which have state and/or handle data go in `src/containers` and generally contain minimal markup.
    * Currently we have `App.js` which is our entry point and houses application state. Aside from that, we have a container for each of our implemented page, since those pages need API data to function.
* API related files go in `src/api`.
    * `APIUtils.js` export several functions, so we don't call the API directly in our components.
* Utility/helper functions that don't relate to the API and can be reused go in `src/utils`
* CSS (Sass) files go in `src/css` where each file corresponds to a component of the same name (except `index.scss`, `_global.scss` and `responsive.scss`).
