import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { normalizeMovie, getFullImgPath } from "../../api/APIUtils";
import "../../css/CardList.scss";

function CardList({ movies }) {
  return (
    <div className="card-list">
      <ul>
        {
          movies.map((mov) => {
            const movie = normalizeMovie(mov);
            const icon = (movie.media_type === "movie") ? "film" : "tv";
            return (
              <li key={movie.id} className="card-list-item">
                <img
                  className="poster"
                  src={getFullImgPath(movie.poster_path, "w185")}
                  alt={`Poster of ${movie.title}`}
                />
                <h1 className="title">{movie.title} ({movie.release_year})</h1>
                <div className="info">
                  <div className="progress">{movie.progress}</div>
                  <div className="rating">
                    <FontAwesomeIcon icon="star" />
                    {movie.my_rating}
                  </div>
                  <div className="added">added {movie.added}</div>
                  <div className="media-type">
                    <FontAwesomeIcon icon={icon} />
                  </div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

CardList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default CardList;
