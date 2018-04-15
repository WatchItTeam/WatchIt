import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../css/Searchbar.scss";

class Searchbar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // from react-router
    value: PropTypes.string.isRequired,
    searchHandler: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const query = url.get("query");
    this.props.setSearchbarValue(query);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { searchbar } = e.target.elements;
    const { value } = searchbar;
    this.props.searchHandler(value);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.props.searchHandler(value);
  }

  clearText = (e) => {
    e.preventDefault();
    this.props.setSearchbarValue("");
  }

  render() {
    const { onChange, onSubmit } = this;
    const { value } = this.props;

    return (
      <form className="searchbar" onSubmit={onSubmit}>
        <i className="fa fa-search" />
        <input type="text" name="searchbar" value={value} onChange={onChange} placeholder="Search" />
        {value && (
          <button onClick={this.clearText}>
            <i className="fa fa-times" />
          </button>
        )}
      </form>
    );
  }
}

export default withRouter(Searchbar);
