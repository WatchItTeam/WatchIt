import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "../css/MovieInfo.scss";


function MovieInformation({ currentMovie }) {
  const settings = {
    dots: true,
  };

  const settingsCast = {
    dots: true,
    slidesToShow: currentMovie.credits.cast.length < 7 ? currentMovie.credits.cast.length : 7,
    slidesToScroll: currentMovie.credits.cast.length < 7 ? 1 : 10,
  };
  const trailers =
    currentMovie.videos.results.map(trailer => (
      <object height="500px" data={`https://www.youtube.com/embed/${trailer.key}`} >hnunu</object>
      // <iframe title="test" src={`https://www.youtube.com/embed/${trailer.key}`} />
    ));
  const cast = currentMovie.credits.cast.map((person) => {
    if (true) {
      return (
        <div>
          <img className="cast" src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt="cast" />
          <p>
            <b className="nameBorder" >{person.name}</b><br /> {person.character}
          </p>
        </div>);
    // <iframe title="test" src={`https://www.youtube.com/embed/${trailer.key}`} />
    } return null;
  });
  const recommendations = currentMovie.recommendations.results.map(movie => (
    <div>
      <img className="cast" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="recommendations" />
      <p>
        <b className="nameBorder" >{movie.title}</b>
      </p>
    </div>
  ));
  return (
    <div className="movieInfo">
      <h2>Story</h2>
      {currentMovie.overview}
      <h2>Trailers</h2>
      {/* <div className="trailer-grid">
        {currentMovie.videos.results.map(trailer => (
          <object data={`https://www.youtube.com/embed/${trailer.key}`} >hnunu</object>
          // <iframe title="test" src={`https://www.youtube.com/embed/${trailer.key}`} />
      ))}
      </div> */}
      <Slider {...settings}>
        {trailers}
      </Slider>
      <h2>Cast</h2>
      <Slider {...settingsCast}>
        {cast}
      </Slider>
      <h2>
        You may also like
      </h2>
      <Slider {...settingsCast}>
        {recommendations}
      </Slider>
      {/* <div className="cast-grid">
        {recommendations}
    </div> */}
    </div>
  );
}

MovieInformation.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default MovieInformation;
