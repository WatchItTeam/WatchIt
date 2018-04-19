import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import PosterGrid from "./PosterGrid";
import PrimaryButton from "./PrimaryButton";
import "../css/Searchpage.scss";

function Searchpage({ results, currentPage, totalPages, totalResults, query, loadMoreFunc }) {
  let content;
  if (results.length === 0) {
    content = "No results :(";
  } else {
    content = <PosterGrid movies={results} />;
  }

  return (
    <section id="searchpage" className="container">
      <p className="info">
        Page {currentPage} of {totalPages}. Showing {results.length} results of {totalResults}
      </p>
      <section>
        <h1>Search results for {query}</h1>
        <InfiniteScroll
          loadMore={loadMoreFunc}
          hasMore={currentPage !== totalPages}
        >
          {content}
        </InfiniteScroll>
      </section>
    </section>
  );
}

Searchpage.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  loadMoreFunc: PropTypes.func.isRequired,
};

export default Searchpage;
