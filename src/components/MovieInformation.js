import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PosterCard from "./PosterCard";
import { normalizeMovie } from "../api/APIUtils";
import "../css/MovieInfo.scss";
import Scroll from "./Scroll";

/**
 * Markup for the main content of the movie details page
 */
function MovieInformation({ currentMovie }) {
  let currentTrailer = 0;
  const trailerlist = [];
  currentMovie.videos.results.map(trailer => (
    trailerlist.push(trailer)
  ));
  let trailersDos;
  const scrolltrailer = () => {
    console.log("hej");
    currentTrailer = (currentTrailer + 1) % trailerlist.length;
    console.log(currentTrailer);
    trailersDos = (
      <div ClassName="">
        <button className="hej"><FontAwesomeIcon icon="angle-left" onClick={scrolltrailer} /></button>
        <div className="embed-container">
          <iframe src={`https://www.youtube.com/embed/${trailerlist[currentTrailer].key}`} frameBorder="0" title={currentTrailer} allowFullScreen />
        </div>
        <button className="hej"><FontAwesomeIcon icon="angle-right" /></button>
      </div>
    );
  };
  trailersDos = (
    <div ClassName="">
      <button className="hej"><FontAwesomeIcon icon="angle-left" onClick={scrolltrailer} /></button>
      <div className="embed-container">
        <iframe src={`https://www.youtube.com/embed/${trailerlist[currentTrailer].key}`} frameBorder="0" title={currentTrailer} allowFullScreen />
      </div>
      <button className="hej"><FontAwesomeIcon icon="angle-right" /></button>
    </div>
  );
  let trailers;
  if (currentMovie.videos.results.length === 0) {
    trailers = <div>No trailers to show</div>;
  } else {
    trailers =
    currentMovie.videos.results.map(trailer => (
      /* <div className="trailer">
        <object className="trailer" data={`https://www.youtube.com/embed/${trailer.key}`} >hnunu</object>
      </div> */
      <div className="trailer2">
        <div className="embed-container">
          <iframe src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" title={currentTrailer} allowFullScreen />
        </div>
      </div>
    ));
  }

  const cast = currentMovie.credits.cast.map((person) => {
    if (person.profile_path === null) {
      return (
        <div>
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
      <div className="card">
        <img className="cast" src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="cast" />
        <p>
          <b className="nameBorder" >{person.name}</b><br /> {person.character}
        </p>
      </div>);
  });

  let recommendationsDosHermanos;
  if (currentMovie.recommendations.results.length === 0) {
    recommendationsDosHermanos = <div className="botPadd">No recommendations to show</div>;
  } else {
    recommendationsDosHermanos = currentMovie.recommendations.results.map((mov) => {
      const movie = normalizeMovie(mov);
      return (
        <div className="card">
          {/*
          <img className="cast" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="recommendations" />
          <p>
            <b className="nameBorder" >{movie.title}</b>
          </p>
          */}
          <PosterCard
            key={movie.id}
            linkTo={`/${(movie.media_type)}/${movie.id}`}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_year}
          />
        </div>
      );
    });
  }

  return (
    <div className="movieInfo">
      <h2>Story</h2>
      {currentMovie.overview}
      <h2>Trailers</h2>
      {trailersDos}
      <Scroll>
        {trailers}
      </Scroll>
      <h2>Cast</h2>
      <Scroll>
        {cast}
      </Scroll>
      <h2>
        You may also like
      </h2>
      <Scroll>
        {recommendationsDosHermanos}
      </Scroll>
    </div>
  );
}

MovieInformation.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default MovieInformation;
