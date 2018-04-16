import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { multiSearch } from "../api/APIUtils";
import Searchpage from "../components/Searchpage";


class SearchpageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    res: [],
    query: "",
  }

  componentDidMount() {
    const query = this.getQuery();
    this.search(query);
  }

  componentDidUpdate() {
    const query = this.getQuery();
    this.search(query);
  }

  getQuery() {
    const url = new URLSearchParams(this.props.location.search);
    return url.get("query");
  }

  async search(query) {
    if (!query) return;

    const res = await multiSearch(query);
    this.setState({ res, query });
  }

  render() {
    const { res, query } = this.state;

    if (!res) return null;

    return (
      <Searchpage results={res} query={query} />
    );
  }
}

export default withRouter(SearchpageContainer);
