import React from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "./ImageWithFallback";
import "../css/EpisodeItem.scss";

function EpisodeItem({ episodeNumber, name, poster }) {
  return (
    <div id="episodeItem">
      <ImageWithFallback
        src={poster}
        imgSize="original"
        mediaType="tv"
        alt={`Poster for ${name}`}
        className="episodePic"
      />
      <div id="episodeTextBox">
        <div id="episodeTitle">
          {episodeNumber}
          &nbsp;
          {name}
        </div>
        <div id="episodeTextContent">
          a
        </div>
      </div>
    </div>
  );
}

EpisodeItem.propTypes = {
  episodeNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default EpisodeItem;
