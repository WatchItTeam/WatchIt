import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { multiSearch } from "../api/APIUtils";
import Searchpage from "../components/Searchpage";


class SearchpageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSearchResults: PropTypes.func.isRequired,
  }

  state = {
    query: "",
  }

  componentDidMount() {
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

    const res = await multiSearch(query);
    this.setState({ query });
    this.props.setSearchResults(res);
  }

  render() {
    const { searchResults } = this.props;
    const { query } = this.state;

    if (!searchResults) return null;

    return (
      <Searchpage results={searchResults} query={query} />
    );
  }
}

export default withRouter(SearchpageContainer);
