import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getFullImgPath, getYearFromDate } from "../api/APIUtils";
import "../css/PosterCard.scss";

function PosterCard({ title, posterPath, linkTo, releaseDate }) {
  const releaseYear = releaseDate ? ` (${getYearFromDate(releaseDate)})` : "";

  let img;
  if (posterPath) {
    img = <img className="poster" src={getFullImgPath(posterPath, "w342")} alt={title} />;
  } else {
    img = <div className="no-poster"><i className="fa fa-image" /></div>;
  }

  return (
    <Link className="poster-card" to={linkTo}>
      {img}
      <p className="title">
        {title}{releaseYear}
      </p>
    </Link>
  );
}

PosterCard.defaultProps = {
  releaseDate: "",
  posterPath: "",
};

PosterCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
};

export default PosterCard;
