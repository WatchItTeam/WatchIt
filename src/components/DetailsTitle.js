import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { getFullImgPath, getYearFromDate } from "../api/APIUtils";
import minutesToHours from "../utils/minutesToHours";
import PrimaryButton from "./PrimaryButton";
import "../css/DetailsTitle.scss";

/**
 * The title (poster, name, rating etc) for the movie details page
 */
function DetailsTitle({ movie, onBtnClick }) {
  const {
    title,
    genres,
    runtime,
    vote_average: rating,
    poster_path: posterPath,
    release_date: releaseDate,
  } = movie;

  return (
    <div className="details-title">
      <img className="poster" src={getFullImgPath(posterPath, "w500")} alt={title} />
      <div className="text">
        <h1 className="title">{`${title} (${getYearFromDate(releaseDate)})`}</h1>
        <div className="info">
          {
            genres.map(genre => genre.name).join(", ")
          }
          <span> • </span>
          {minutesToHours(runtime)}
          <span> • </span>
          {moment(releaseDate).format("MMM Do YYYY")}
        </div>
        <div className="bottom">
          <PrimaryButton onClick={onBtnClick}>+ Add to</PrimaryButton>
          &nbsp;&nbsp;
          <span className="rating">
            <i className="fa fa-star star-icon" /> {rating}
          </span>
        </div>
      </div>
    </div>
  );
}

DetailsTitle.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  }).isRequired,
  onBtnClick: PropTypes.func.isRequired,
};

export default DetailsTitle;
