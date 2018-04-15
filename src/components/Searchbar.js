import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/Searchbar.scss";

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { searchbar } = e.target.elements;
    const { value } = searchbar;
    this.props.search(value);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.props.search(value);
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

export default Searchbar;
