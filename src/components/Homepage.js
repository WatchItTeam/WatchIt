import React from "react";
import PropTypes from "prop-types";
import PosterGrid from "./PosterGrid";

function Homepage({ movies, series }) {
  return (
    <div id="homepage" className="container">
      <h1>Home</h1>
      <section>
        <h2>Now playing movies</h2>
        <PosterGrid movies={movies} type="movie" />
      </section>
      <section>
        <h2>Now airing TV shows</h2>
        <PosterGrid movies={series} type="tv" />
      </section>
    </div>
  );
}

Homepage.propTypes = {
  movies: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};

export default Homepage;
