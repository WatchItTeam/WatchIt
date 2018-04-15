import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { multiSearch } from "../api/APIUtils";
import Searchpage from "../components/Searchpage";

const DEBOUNCE_TIME = 500;

class SearchpageContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  timeout = null;
  state = {
    res: [],
    query: "",
  }

  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const query = url.get("query");
    this.search(query);
  }

  componentDidUpdate(nextProps) {
    const url = new URLSearchParams(nextProps.location.search);
    const query = url.get("query");
    if (query !== this.state.query) {
      this.search(query);
    }
  }

  search(query) {
    if (!query) return;

    clearTimeout(this.timeout);
    this.setState({ query });

    this.timeout = setTimeout(async () => {
      const res = await multiSearch(query);
      this.setState({ res });
    }, DEBOUNCE_TIME);
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
