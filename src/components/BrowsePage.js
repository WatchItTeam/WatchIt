import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Tabs from "./Tabs";
import BrowseGenresContainer from "../containers/BrowseGenresContainer";
import PosterGrid from "./PosterGrid";
import ErrorMessage from "./ErrorMessage";

function BrowsePage({
  movies,
  tabLinks,
  genres,
  genreTitle,
  type,
  isLoading,
  error }) {
  let titleTabs;

  if (type === "movies") {
    titleTabs = (
      <div>
        <h1>{`Browse movies ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
      </div>);
  } else if (type === "shows") {
    titleTabs = (
      <div>
        <h1>{`Browse TV shows ${genreTitle}`}</h1>
        <Tabs links={tabLinks} />
      </div>);
  }

  if (isLoading) {
    return (
      <section className="container">
        {titleTabs}
        loading...
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        {titleTabs}
        <ErrorMessage>Oops! Could not load homepage :(</ErrorMessage>
      </section>
    );
  }

  if (type === "movies") {
    return (
      <section className="container">
        {titleTabs}
        <Switch>
          <Route
            exact
            path="/movies/genre/"
            render={props =>
              <BrowseGenresContainer {...props} genres={genres} type={type} />
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

  if (type === "shows") {
    return (
      <section className="container">
        {titleTabs}
        <Switch>
          <Route
            exact
            path="/shows/genre/"
            render={props =>
              <BrowseGenresContainer {...props} genres={genres} type={type} />
            }
          />
          <Route
            path="/shows/:filter"
            render={() => (
              <PosterGrid movies={movies} />
            )}
          />
        </Switch>
      </section>
    );
  }
}

BrowsePage.propTypes = {
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genreTitle: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default BrowsePage;
