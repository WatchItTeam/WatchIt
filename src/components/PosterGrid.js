import React from "react";
import PropTypes from "prop-types";
import PosterCard from "./PosterCard";
import "../css/PosterGrid.scss";

function PosterGrid({ movies, type }) {
  const getTitle = (movie) => {
    if (type === "tv") {
      return movie.name;
    }
    return movie.title;
  }
  return (
    <div className="poster-grid">
      {movies.map(movie => (
        <PosterCard
          key={movie.id}
          linkTo={`/${type}/${movie.id}`}
          title={getTitle(movie)}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
        />
      ))}
    </div>
  );
}

PosterGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
};

export default PosterGrid;
