import React from "react";
import propTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PosterCard from "./PosterCard";
import { normalizeMovie } from "../api/APIUtils";
import Scroll from "./Scroll";
import Trailers from "./Trailers";
import "../css/MovieInfo.scss";
import "../css/Scroll.scss";


/**
 * Markup for the main content of the movie details page
 */
function MovieInformation({ currentMovie }) {
  let cast;
  if (currentMovie.credits.cast.length === 0) {
    cast = <div>No cast to show</div>;
  } else {
    const castSorted =
    currentMovie.credits.cast.sort((a, b) => a.order - b.order);
    cast = (
      <Scroll arrayLength={castSorted.length}>
        {
          castSorted.map((person) => {
            if (person.profile_path === null) {
              return (
                <div key={person.id}>
                  <div className="no-poster">
                    <FontAwesomeIcon icon="image" />
                  </div>
                  <p>
                    <b className="nameBorder" >{person.name}</b><br /> {person.character}
                  </p>
                </div>
              );
            }
            return (
              <div className="card" key={person.id}>
                <img className="cast" src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="cast" />
                <p>
                  <b className="nameBorder" >{person.name}</b><br /> {person.character}
                </p>
              </div>);
          })
        }
      </Scroll>
    );
  }

  let recommendations;
  if (currentMovie.recommendations.results.length === 0) {
    recommendations = <div className="botPadding">No recommendations to show</div>;
  } else {
    recommendations = (
      <Scroll arrayLength={currentMovie.recommendations.results.length}>
        {
          currentMovie.recommendations.results.map((mov) => {
            const movie = normalizeMovie(mov);
            return (
              <div className="card" key={movie.id}>
                <PosterCard
                  key={movie.id}
                  id={movie.id}
                  linkTo={`/${(movie.media_type)}/${movie.id}`}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  mediaType={movie.media_type}
                />
              </div>
            );
          })
        }
      </Scroll>
    );
  }

  return (
    <div className="movieInfo">
      <h2>Story</h2>
      {currentMovie.overview}
      <h2>Trailers</h2>
      <Trailers trailers={currentMovie.videos.results} />
      <h2>Cast</h2>
      {cast}
      <h2>
        You may also like
      </h2>
      {recommendations}
    </div>
  );
}

MovieInformation.propTypes = {
  currentMovie: propTypes.object.isRequired,
};

export default MovieInformation;