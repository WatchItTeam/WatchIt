import React from "react";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";
import "../css/Header.scss";

function Header({ username, onSignOutClick, toggleSidebar, searchbarValue, onSearchChange }) {
  return (
    <header id="app-header">
      <button id="toggle-btn" onClick={toggleSidebar}>
        <i className="fa fa-bars" />
      </button>
      <Searchbar value={searchbarValue} onChange={onSearchChange} />
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

Header.propTypes = {
  username: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Header;
