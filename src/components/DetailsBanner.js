import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { getFullImgPath } from "../api/APIUtils";
import "../css/DetailsBanner.scss";

/**
 * The backdrop banner for the movie details page
 */
function DetailsBanner({ backdropPath }) {
  if (backdropPath === null) {
    return (
      <div className="no-poster2">
        <FontAwesomeIcon icon="image" />
      </div>);
  }
  return (
    <div id="banner">
      <img src={getFullImgPath(backdropPath)} alt="banner of movie" />
      <div className="gradient" />
    </div>
  );
}

DetailsBanner.propTypes = {
  backdropPath: PropTypes.string.isRequired,
};

export default DetailsBanner;
