import React from "react";
import PropTypes from "prop-types";
import "../css/MovieInfo.scss";

function MovieInformation({ currentMovie }) {
  //const URL = `https://www.youtube.com/embed/${currentMovie.videos.results[0].key}`;
  console.log("bajsRobert");
  //console.log(currentMovie.videos);
  console.log("timmmey");
  console.log(currentMovie.videos.results[0]);
  return (
    <div className="movieInfo">
      <h2>Story</h2>
      {currentMovie.overview}
      <h2>Trailers</h2>
      <iframe title="test" width="420" height="315" src={URL} />
    </div>
  );
}

MovieInformation.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default MovieInformation;
