import React from "react";
import PropTypes from "prop-types";
import DetailsBanner from "./DetailsBanner";
import DetailsTitle from "./DetailsTitle";
import MovieInformation from "./MovieInformation";

/**
 * Markup for the details page
 */
function DetailsPage({ currentMovie }) {
  return (
    <div id="detailspage">
      <DetailsBanner backdropPath={currentMovie.backdrop_path} />
      <DetailsTitle movie={currentMovie} onBtnClick={() => 1} />
      <MovieInformation currentMovie={currentMovie} />
    </div>
  );
}

DetailsPage.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default DetailsPage;