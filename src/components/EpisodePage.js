import React from "react";
import PropTypes from "prop-types";
import Season from "./Season";

function EpisodePage({
  title,
  episodes,
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
      <h1>{title}</h1>
      <Season
        episodes={episodes}
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
  seasonNumber: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.number.isRequired,
};

export default EpisodePage;
