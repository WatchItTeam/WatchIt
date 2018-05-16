import React from "react";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "./Responsive";
import EpisodeItem from "./EpisodeItem";
import EpisodeMobileItem from "./EpisodeMobileItem";

function Season({ episodes, seasonNumber, addEpisode }) {
  return (
    <div>
      <h2>{`Season ${seasonNumber}`}</h2>
      {episodes.map(episode => (
        <div key={episode.id}>
          <Mobile>
            <EpisodeMobileItem
              episodeNumber={episode.episode_number}
              name={episode.name}
              poster={episode.still_path}
              addEpisode={addEpisode}
              description={episode.overview}
              watched={false}
            />
          </Mobile>
          <Desktop>
            <EpisodeItem
              episodeNumber={episode.episode_number}
              name={episode.name}
              poster={episode.still_path}
              description={episode.overview}
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
};

export default Season;
