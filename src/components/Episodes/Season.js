import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "../Responsive";
import EpisodeItem from "./EpisodeItem";
import EpisodeMobileItem from "./EpisodeMobileItem";

function Season({ episodes, watchedEpisodes, seasonNumber, addEpisode, removeEpisode, showId }) {
  return (
    <div>
      <h2>{`Season ${seasonNumber}`}</h2>
      {episodes.map(episode => (
        <Fragment key={episode.id}>
          <Mobile>
            <EpisodeMobileItem
              episodeNumber={episode.episode_number}
              name={episode.name}
              addEpisode={addEpisode}
              removeEpisode={removeEpisode}
              watched={watchedEpisodes[episode.episode_number] === true}
              description={episode.overview}
              showId={showId}
            />
          </Mobile>
          <Desktop>
            <EpisodeItem
              episodeNumber={episode.episode_number}
              name={episode.name}
              poster={episode.still_path}
              addEpisode={addEpisode}
              removeEpisode={removeEpisode}
              watched={watchedEpisodes[episode.episode_number] === true}
              description={episode.overview}
              showId={showId}
            />
          </Desktop>
        </Fragment>
      ))}
    </div>
  );
}

Season.propTypes = {
  episodes: PropTypes.array.isRequired,
  watchedEpisodes: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
};

export default Season;
