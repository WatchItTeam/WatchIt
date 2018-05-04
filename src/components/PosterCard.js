import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getYearFromDate } from "../api/APIUtils";
import ImageWithFallback from "./ImageWithFallback";
import "../css/PosterCard.scss";

/**
 * Reusable component for showing a movie poster and title
 */
function PosterCard({ title, posterPath, linkTo, releaseDate, mediaType }) {
  const releaseYear = releaseDate ? ` (${getYearFromDate(releaseDate, "w342")})` : "";

  return (
    <Link className="poster-card" to={linkTo}>
      <ImageWithFallback
        src={posterPath}
        imgSize="w342"
        mediaType={mediaType}
        alt={`Poster for ${title}`}
        className="poster"
      />
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
  mediaType: PropTypes.string.isRequired,
};

export default PosterCard;
