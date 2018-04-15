import React from "react";
import PropTypes from "prop-types";
import PosterCard from "./PosterCard";
import "../css/PosterGrid.scss";

function getTitle(movie, type) {
  // if type isn't explicitly set, check the media_type value instead,
  // which is present in API calls for search, for example
  const mediaType = type || movie.media_type;
  return mediaType === "movie" ? movie.title : movie.name;
}

function getReleaseDate(movie, type) {
  const mediaType = type || movie.media_type;
  return mediaType === "movie" ? movie.release_date : movie.first_air_date;
}

function PosterGrid({ movies, type }) {
  return (
    <div className="poster-grid">
      {movies.map(movie => (
        <PosterCard
          key={movie.id}
          linkTo={`/${(type || movie.media_type)}/${movie.id}`}
          title={getTitle(movie, type)}
          posterPath={movie.poster_path}
          releaseDate={getReleaseDate(movie, type)}
        />
      ))}
    </div>
  );
}

PosterGrid.defaultProps = {
  type: "",
};

PosterGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** If the movies array contains both movies and tv shows, don't set the type prop */
  type: PropTypes.oneOf(["movie", "tv", ""]),
};

export default PosterGrid;
