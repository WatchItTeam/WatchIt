import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Desktop, Mobile } from "../Responsive";
import EpisodeItem from "./EpisodeItem";
import EpisodeMobileItem from "./EpisodeMobileItem";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { episodeString } from "../../Firebase/lists";
import { SignedIn } from "../UserState/UserState";
import "../../css/Season.scss";

function isWatched(watchedEpisodes, seasonNumber, episodeNumber) {
  if (!watchedEpisodes) return false;
  return watchedEpisodes[episodeString(seasonNumber, episodeNumber)] === true;
}

function wholeSeasonIsWatched(watchedEpisodes, seasonLength, seasonNumber) {
  let epCounter = 0;
  for (let i = 1; i <= seasonLength; i++) {
    if (watchedEpisodes[episodeString(seasonNumber, i)]) epCounter++;
  }
  return epCounter === seasonLength;
}

function Season({
  episodes, watchedEpisodes, seasonNumber, addEpisode, removeEpisode, showId, setSeason,
}) {
  const seasonComplete = wholeSeasonIsWatched(watchedEpisodes, episodes.length, seasonNumber);

  let seasonBtn;
  if (!seasonComplete) {
    seasonBtn = (
      <PrimaryButton onClick={() => setSeason(seasonNumber, true)}>
        <FontAwesomeIcon icon="check" /> Add season
      </PrimaryButton>
    );
  } else {
    seasonBtn = (
      <SecondaryButton onClick={() => setSeason(seasonNumber, false)}>
        <FontAwesomeIcon icon="times" /> Remove season
      </SecondaryButton>
    );
  }

  return (
    <div className="season">
      <div className="title-bar">
        <h2>{`Season ${seasonNumber}`}</h2>
        <div>
          <SignedIn>
            {() => seasonBtn}
          </SignedIn>
        </div>
      </div>
      {episodes.map(episode => (
        <Fragment key={episode.id}>
          <Mobile>
            <EpisodeMobileItem
              episodeNumber={episode.episode_number}
              seasonNumber={seasonNumber}
              name={episode.name}
              addEpisode={addEpisode}
              removeEpisode={removeEpisode}
              watched={isWatched(watchedEpisodes, seasonNumber, episode.episode_number)}
              description={episode.overview}
              showId={showId}
            />
          </Mobile>
          <Desktop>
            <EpisodeItem
              episodeNumber={episode.episode_number}
              seasonNumber={seasonNumber}
              name={episode.name}
              poster={episode.still_path}
              addEpisode={addEpisode}
              removeEpisode={removeEpisode}
              watched={isWatched(watchedEpisodes, seasonNumber, episode.episode_number)}
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
  setSeason: PropTypes.func.isRequired,
};

export default Season;
