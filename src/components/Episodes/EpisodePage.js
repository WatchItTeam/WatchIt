import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Season from "./Season";
import Tabs from "../Tabs";

function mapSeasonsToTabs(numberOfSeasons, showId) {
  const baseUrl = `/tv/${showId}/episodes`;
  const tabLinks = {
    All: `${baseUrl}/all`,
  };
  for (let i = 1; i < numberOfSeasons; i++) {
    tabLinks[i] = `${baseUrl}/${i}`;
  }
  return tabLinks;
}

function EpisodePage({
  title,
  episodes,
  numberOfSeasons,
  watchedEpisodes,
  seasonNumber,
  isLoading,
  addEpisode,
  removeEpisode,
  showId,
  setSeason,
}) {
  if (isLoading) {
    return (
      <div className="container">Loading...</div>
    );
  }

  const baseUrl = `/tv/${showId}`;

  return (
    <section className="container">
      <Link to={baseUrl}>
        <h1>
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          {title}
        </h1>
      </Link>
      <Tabs links={mapSeasonsToTabs(numberOfSeasons, showId)} />
      <Season
        episodes={episodes}
        watchedEpisodes={watchedEpisodes}
        seasonNumber={seasonNumber}
        addEpisode={addEpisode}
        removeEpisode={removeEpisode}
        showId={showId}
        setSeason={setSeason}
      />
    </section>
  );
}

EpisodePage.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
  numberOfSeasons: PropTypes.number.isRequired,
  watchedEpisodes: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  setSeason: PropTypes.func.isRequired,
};

export default EpisodePage;
