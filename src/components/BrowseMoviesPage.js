import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Tabs from "./Tabs";
import BrowseGenresContainer from "../containers/BrowseGenresContainer";
import PosterGrid from "./PosterGrid";
import ErrorMessage from "./ErrorMessage";

function BrowseMoviesPage({ movies, tabLinks, genres, genreTitle, isLoading, error, ...props }) {
  if (isLoading) {
    return (
      <section className="container">
        <h1>{`Browse movies ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
        loading...
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        <h1>{`Browse movies ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
        <ErrorMessage>Oops! Could not load homepage :(</ErrorMessage>
      </section>
    );
  }

  return (
    <section className="container">
      <h1>{`Browse movies ${genreTitle}`}</h1>
      <Tabs links={tabLinks} />
      <Switch>
        <Route
          exact
          path="/movies/genre/"
          render={() =>
            <BrowseGenresContainer {...props} genres={genres} />
          }
        />
        <Route
          path="/movies/:filter"
          render={() => (
            <PosterGrid movies={movies} />
          )}
        />
      </Switch>
    </section>
  );
}

BrowseMoviesPage.propTypes = {
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genreTitle: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BrowseMoviesPage;
