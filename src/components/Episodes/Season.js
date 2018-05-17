import React from "react";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "../Responsive";
import EpisodeItem from "./EpisodeItem";
import EpisodeMobileItem from "./EpisodeMobileItem";

function Season({ episodes, seasonNumber, addEpisode, removeEpisode, showId }) {
  return (
    <div>
      <h2>{`Season ${seasonNumber}`}</h2>
      {episodes.map(episode => (
        <div key={episode.id}>
          <Mobile>
            <EpisodeMobileItem
              episodeNumber={episode.episode_number}
              name={episode.name}
              addEpisode={addEpisode}
              removeEpisode={removeEpisode}
              description={episode.overview}
              episodeId={episode.id}
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
              description={episode.overview}
              episodeId={episode.id}
              showId={showId}
            />
          </Desktop>
        </div>
      ))}
    </div>
  );
}

Season.propTypes = {
  episodes: PropTypes.array.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
};

export default Season;
