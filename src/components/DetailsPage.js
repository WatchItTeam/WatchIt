import React from "react";
import PropTypes from "prop-types";

import MovieInformation from "./MovieInformation";
import "../css/Homepage.scss";

function DetailsPage({ currentMovie }) {
  return (
    <div id="detailspage">
      { /* <DetailsBanner />
      <DetailsTitle /> */ }
      <MovieInformation currentMovie={currentMovie} />
    </div>
  );
}

DetailsPage.propTypes = {
  currentMovie: PropTypes.object.isRequired,
};

export default DetailsPage;
