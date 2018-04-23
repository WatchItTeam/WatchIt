import React from "react";
import PropTypes from "prop-types";
import Searchbar from "../Searchbar";
import "../../css/Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 */
function DesktopHeader({
  username, onSignOutClick, setSearchbarValue, searchbarValue, searchHandler,
}) {
  return (
    <header id="app-header-desktop" className="app-header">
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

DesktopHeader.propTypes = {
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
};

export default DesktopHeader;
