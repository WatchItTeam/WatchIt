import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Tabs from "./Tabs";
import BrowseGenresContainer from "../containers/BrowseGenresContainer";
import PosterGrid from "./PosterGrid";

function BrowseMoviesPage({ movies, tabLinks, ...props }) {
  return (
    <section className="container">
      <h1>Browse movies</h1>
      <Tabs links={tabLinks} />
      <Route
        exact
        path="/movies/genre/"
        render={() =>
          <BrowseGenresContainer {...props} />
        }
      />
      <PosterGrid movies={movies} />
    </section>
  );
}

BrowseMoviesPage.propTypes = {
  tabLinks: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BrowseMoviesPage;
