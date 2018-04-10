import React from "react";
import PropTypes from "prop-types";
import PosterGrid from "./PosterGrid";
import "../css/Homepage.scss";

function Homepage({ movies, series }) {
  return (
    <div id="homepage">
      <h1> Home </h1>
      <h2> Now playing movies </h2>
      <PosterGrid movies={movies} type="movie" />
      <h2> Now airing TV shows </h2>
      <PosterGrid movies={series} type="tv" />
    </div>
  );
}

Homepage.propTypes = {
  movies: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};

export default Homepage;
