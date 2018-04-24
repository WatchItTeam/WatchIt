import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { getFullImgPath } from "../api/APIUtils";
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
    name,
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    episode_run_time: episodeRunTime,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
  } = movie;

  let infoLine;

  // if title is defined, it's a movie
  if (title) {
    infoLine = (
      <div className="info">
        {
          genres.map(genre => genre.name).join(", ")
        }
        <span> • </span>
        {minutesToHours(runtime)}
        <span> • </span>
        {moment(releaseDate).format("MMM Do YYYY")}
      </div>
    );
  } else {
    infoLine = (
      <div className="info">
        {
          genres.map(genre => genre.name).join(", ")
        }
        <span> • </span>
        {minutesToHours(episodeRunTime[0])} per episode
        <span> • </span>
        {numberOfEpisodes} episodes, {numberOfSeasons} seasons
        <span> • </span>
        {moment(firstAirDate).format("YYYY")}-{moment(lastAirDate).format("YYYY")}
      </div>
    );
  }

  const displayName = title || name;
  const displayDate = releaseDate || firstAirDate;

  return (
    <div className="details-title">
      <img className="poster" src={getFullImgPath(posterPath, "w500")} alt={title} />
      <div className="text">
        <h1 className="title">{`${displayName} (${moment(displayDate).format("YYYY")})`}</h1>
        <div className="info">
          {infoLine}
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
  movie: PropTypes.object.isRequired,
  onBtnClick: PropTypes.func.isRequired,
};

export default DetailsTitle;
