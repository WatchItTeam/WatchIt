import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";
import "../css/Header.scss";

/**
 * The header, which includes search bar and user info
 */
class Header extends Component {
  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const query = url.get("query") || "";
    this.props.setSearchbarValue(query);
  }

  render() {
    const {
      username, onSignOutClick, toggleSidebar, setSearchbarValue, searchbarValue, searchHandler,
    } = this.props;
    return (
      <header id="app-header">
        <button id="toggle-btn" onClick={toggleSidebar}>
          <i className="fa fa-bars" />
        </button>
        <Searchbar
          value={searchbarValue}
          search={searchHandler}
          setSearchbarValue={setSearchbarValue}
        />
        <div id="user-info">
          <div className="user-img" />
          {username}
          <button onClick={onSignOutClick}>
            <i className="fa fa-sign-out-alt" /> Sign out
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired, // from react-router
  username: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
};

export default withRouter(Header);
