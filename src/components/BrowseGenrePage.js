import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import TitleGrid from "./TitleGrid";

function BrowseGenrePage({ genres }) {
  const genreLinks = {};
  return (
    <section>
      <Switch>
        <Route
          exact
          path="/movies/genre/:id?"
          render={() => {
            genres.forEach((genre) => {
              genreLinks[genre.name] = `/movies/genre/${genre.id}`;
            });
            return <TitleGrid links={genreLinks} />;
          }}
        />
      </Switch>
    </section>
  );
}

BrowseGenrePage.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default BrowseGenrePage;
