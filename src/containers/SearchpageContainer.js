import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { multiSearch } from "../api/APIUtils";
import Searchpage from "../components/Searchpage";


class SearchpageContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    searchResults: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.object).isRequired,
      currentPage: PropTypes.number,
      totalResults: PropTypes.number,
      totalPages: PropTypes.number,
    }).isRequired,
    setSearchResults: PropTypes.func.isRequired,
  }

  state = {
    query: "",
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    // if the component is mounted by the user backing in the browser,
    // no need to search again
    if (this.props.history.action === "POP") return;

    const query = this.getQuery();
    this.search(query);
  }

  componentDidUpdate() {
    const query = this.getQuery();
    if (query !== this.state.query) {
      this.search(query);
    }
  }

  getQuery() {
    const url = new URLSearchParams(this.props.location.search);
    return url.get("query");
  }

  async search(query) {
    if (!query) return;

    try {
      this.setState({ query, isLoading: true });
      const resp = await multiSearch(query);
      this.props.setSearchResults({
        results: resp.results,
        currentPage: resp.page,
        totalPages: resp.total_pages,
        totalResults: resp.total_results,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }

    this.setState({ isLoading: false });
  }

  loadMoreAndAppend = async () => {
    const { currentPage } = this.props.searchResults;

    try {
      const resp = await multiSearch(this.state.query, currentPage + 1);
      this.props.setSearchResults({
        results: [...this.props.searchResults.results, ...resp.results],
        currentPage: resp.page,
        totalPages: resp.total_pages,
        totalResults: resp.total_results,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  render() {
    const { searchResults } = this.props;
    const { results, currentPage, totalPages, totalResults } = searchResults;
    const { query, error, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="container">
          Loading...
        </div>
      );
    }

    if (error) {
      return (
        <div className="container">
          Looks like something went wrong :(
          <br />Are you offline?
        </div>
      );
    }

    return (
      <Searchpage
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        query={query}
        loadMoreFunc={this.loadMoreAndAppend}
      />
    );
  }
}

export default withRouter(SearchpageContainer);
