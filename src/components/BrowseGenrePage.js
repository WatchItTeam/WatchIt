import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import TitleGrid from "./TitleGrid";
import PosterGrid from "./PosterGrid";

function BrowseGenrePage({ genres, genreId }) {
  const genreLinks = {};
  return (
    <section className="container">
      <Switch>
        <Route
          exact
          path="/movies/genre/"
          render={() => {
            genres.forEach((genre) => {
              genreLinks[genre.name] = `/movies/genre/${genre.id}`;
            });
            return <TitleGrid links={genreLinks} />;
          }}
        />
        <Route
          exact
          path="/movies/genre/:id"
          render={() =>
            <PosterGrid />
          }
        />
      </Switch>
    </section>
  );
}

BrowseGenrePage.defaultProps = {
  genreId: "0",
};

BrowseGenrePage.propTypes = {
  genres: PropTypes.array.isRequired,
  genreId: PropTypes.string,
};

export default BrowseGenrePage;
