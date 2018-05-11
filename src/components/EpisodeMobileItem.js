import React from "react";
import PropTypes from "prop-types";
import ImageWithFallback from "./ImageWithFallback";
import "../css/EpisodeMobileItem.scss";

function EpisodeMobileItem({ episodeNumber, name, poster }) {
  return (
    <div id="episodeMobileItem">
      <div id="posterWrapper">
        <div id="episodeNumber">
          {episodeNumber}
        </div>
      </div>
      <div id="episodeTitle">
        {name}
      </div>
      <div id="episodeExpandBtn" />
    </div>
  );
}

EpisodeMobileItem.propTypes = {

};

export default EpisodeMobileItem;
