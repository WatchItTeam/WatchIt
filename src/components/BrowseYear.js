import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import PosterGrid from "./PosterGrid";
import Searchbar from "./Searchbar";
import "../css/BrowseYear.scss";

function BrowseYear({ movies, searchValue, search, setSearchbarValue, statusMsg }) {
  return (
    <Route
      path="/(movies|shows)/year/"
      render={() => (
        <section>
          <div className="yearbar">
            <div id="yearbar-text">Search by year</div>
            <Searchbar
              value={searchValue}
              search={search}
              setSearchbarValue={setSearchbarValue}
            />
          </div>
          {statusMsg}
          <PosterGrid movies={movies} />
        </section>
      )}
    />
  );
}

BrowseYear.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
  statusMsg: PropTypes.node.isRequired,
};

export default BrowseYear;
