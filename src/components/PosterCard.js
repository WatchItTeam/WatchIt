import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getFullImgPath, getYearFromDate } from "../api/APIUtils";
import "../css/PosterCard.scss";

function PosterCard({ title, posterPath, linkTo, releaseDate }) {
  return (
    <Link className="poster-card" to={linkTo}>
      <img className="poster" src={getFullImgPath(posterPath, "w342")} alt={title} />
      <p className="title">
        {title} ({getYearFromDate(releaseDate)})
      </p>
    </Link>
  );
}

PosterCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default PosterCard;
