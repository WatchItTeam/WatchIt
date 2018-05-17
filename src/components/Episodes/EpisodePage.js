import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Season from "./Season";

function EpisodePage({
  title,
  episodes,
  watchedEpisodes,
  seasonNumber,
  isLoading,
  addEpisode,
  removeEpisode,
  showId,
}) {
  if (isLoading) {
    return (
      <div className="container">Loading...</div>
    );
  }

  return (
    <section className="container">
      <Link to={`/tv/${showId}`}>
        <h1>
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          {title}
        </h1>
      </Link>
      <Season
        episodes={episodes}
        watchedEpisodes={watchedEpisodes}
        seasonNumber={seasonNumber}
        addEpisode={addEpisode}
        removeEpisode={removeEpisode}
        showId={showId}
      />
    </section>
  );
}

EpisodePage.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
  watchedEpisodes: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
};

export default EpisodePage;
