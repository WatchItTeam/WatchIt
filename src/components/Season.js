import React from "react";
import PropTypes from "prop-types";
import { Desktop, Mobile } from "./Responsive";
import EpisodeItem from "./EpisodeItem";
import EpisodeMobileItem from "./EpisodeMobileItem";

function Season({ episodes, seasonNumber }) {
  return (
    <div>
      <h2>{`Season ${seasonNumber}`}</h2>
      {episodes.map(episode => (
        <div>
          <Mobile>
            <EpisodeMobileItem
              key={episode.id}
              episodeNumber={episode.episode_number}
              name={episode.name}
              poster={episode.still_path}
            />
          </Mobile>
          <Desktop>
            <EpisodeItem
              key={episode.id}
              episodeNumber={episode.episode_number}
              name={episode.name}
              poster={episode.still_path}
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
