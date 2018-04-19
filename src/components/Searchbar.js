import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/Searchbar.scss";

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  }

  inputRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.inputRef.current;
    this.props.search(value);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.props.search(value);
  }

  clearText = (e) => {
    e.preventDefault();
    this.props.setSearchbarValue("");
    this.inputRef.current.focus();
  }

  render() {
    const { onChange, onSubmit } = this;
    const { value } = this.props;

    return (
      <form className="searchbar" onSubmit={onSubmit}>
        <i className="fa fa-search" />
        <input
          type="text"
          ref={this.inputRef}
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
        {value && (
          <button type="button" onClick={this.clearText} className="clear-btn">
            <i className="fa fa-times" />
          </button>
        )}
      </form>
    );
  }
}

export default Searchbar;
