import React from "react";
import PropTypes from "prop-types";
import { getFullImgPath } from "../api/APIUtils";
import "../css/DetailsBanner.scss";

function DetailsBanner({ backdropPath }) {
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
