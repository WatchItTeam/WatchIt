import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Searchbar from "../Searchbar";
import "../../css/Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 * The state is only for UI within this component, so this doesn't count
 * as a container component
 */
class MobileHeader extends Component {
  state = { searchIsVisible: false };

  showSearch = () => {
    this.setState({ searchIsVisible: true });
  }

  hideSearch = () => {
    this.setState({ searchIsVisible: false });
  }

  render() {
    const {
      username, onSignOutClick, toggleSidebar, setSearchbarValue, searchbarValue, searchHandler,
    } = this.props;

    if (this.state.searchIsVisible) {
      return (
        <header id="app-header-mobile" className="app-header">
          <button id="search-hide" onClick={this.hideSearch}>
            <FontAwesomeIcon icon="arrow-left" />
          </button>
          <Searchbar
            value={searchbarValue}
            search={searchHandler}
            setSearchbarValue={setSearchbarValue}
          />
        </header>
      );
    }

    return (
      <header id="app-header-mobile" className="app-header">
        <button id="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon="bars" />
        </button>
        <div id="header-title">
          {document.title}
        </div>
        <button id="header-search-btn" onClick={this.showSearch}>
          <FontAwesomeIcon icon="search" />
        </button>
        {
          /*
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
          */
        }
      </header>
    );
  }
}

MobileHeader.propTypes = {
  username: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
};

export default MobileHeader;
