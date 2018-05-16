import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Searchbar from "../Searchbar";
import "../../css/Header.scss";
import { SignedIn, SignedOut } from "../UserState/UserState";

/**
 * The header for desktop, which includes search bar and user info
 * The state is only for UI within this component, so this doesn't count
 * as a container component
 */
class MobileHeader extends Component {
  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    searchbarValue: PropTypes.string.isRequired,
    searchHandler: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location && !props.location.pathname.includes("search")) {
      return {
        searchIsVisible: false,
        location: props.location,
      };
    }
    return { location: props.location };
  }

  state = { searchIsVisible: false };

  searchbarRef = React.createRef();

  showSearch = () => {
    this.setState({ searchIsVisible: true });
  }

  hideSearch = () => {
    this.setState({ searchIsVisible: false });
  }

  componentDidUpdate() {
    if (this.state.searchIsVisible) {
      // if the searchbar becomes visible, focus on the input
      this.searchbarRef.current.inputRef.current.focus();
    }
  }

  render() {
    const {
      toggleSidebar, setSearchbarValue, searchbarValue, searchHandler,
    } = this.props;

    if (this.state.searchIsVisible) {
      return (
        <header id="app-header-mobile" className="app-header">
          <button id="search-hide" onClick={this.hideSearch}>
            <FontAwesomeIcon icon="arrow-left" />
          </button>
          <Searchbar
            ref={this.searchbarRef}
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
        <SignedIn>
          {() => ( // Shows signout-icon if user is signed in, login icon otherwise
            <nav>
              {
                <button id="signin-mobile-btn">
                  <FontAwesomeIcon icon="sign-out-alt" />
                </button>
                }
            </nav>
            )}
        </SignedIn>
        <SignedOut>
          <button id="signin-mobile-btn">
            <FontAwesomeIcon icon="user" />
          </button>
        </SignedOut>
      </header>
    );
  }
}

export default withRouter(MobileHeader);
