import React from "react";
import PropTypes from "prop-types";

function MovieInformation({ currentMovie }) {
  return (
    <div className="movieInfo">
      {currentMovie.overview}
    </div>
  );
}

MovieInformation.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default MovieInformation;
