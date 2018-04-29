import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Searchbar from "../Searchbar";
import LoginHandler from "../Login/LoginHandler";
import "../../css/Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 */
function DesktopHeader({
  username, onSignOutClick, setSearchbarValue, searchbarValue, searchHandler, setUsername,
}) {
  return (
    <header id="app-header-desktop" className="app-header">
      <Searchbar
        value={searchbarValue}
        search={searchHandler}
        setSearchbarValue={setSearchbarValue}
      />
      <LoginHandler
        setUsername={setUsername}
        username={username}
        onSignOutClick={onSignOutClick}
      />
    </header>
  );
}

DesktopHeader.propTypes = {
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
};

export default DesktopHeader;
