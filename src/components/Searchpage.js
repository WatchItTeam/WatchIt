import React from "react";
import PropTypes from "prop-types";
import PosterGrid from "../components/PosterGrid";

function Searchpage({ results }) {
  return (
    <section id="searchpage" className="container">
      <h1>Search results</h1>
      <PosterGrid movies={results} />
    </section>
  );
}

Searchpage.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Searchpage;
