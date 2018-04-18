import React from "react";
import PropTypes from "prop-types";
import PosterGrid from "../components/PosterGrid";

function Searchpage({ results, query }) {
  let content;
  if (results.length === 0) {
    content = "No results :(";
  } else {
    content = <PosterGrid movies={results} />;
  }

  return (
    <section id="searchpage" className="container">
      <h1>Search results for {query}</h1>
      {content}
    </section>
  );
}

Searchpage.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
};

export default Searchpage;
