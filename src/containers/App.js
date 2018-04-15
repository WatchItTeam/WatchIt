import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import HomepageContainer from "./HomepageContainer";
import SearchpageContainer from "./SearchpageContainer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../css/App.scss";

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // from react-router
  }

  /**
   * This function makes the sidebar close whenever
   * the user clicks a link in the sidebar
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.location !== nextProps.location) {
      return {
        sidebarIsOpen: false,
        location: nextProps.location,
      };
    }
    return { location: nextProps.location };
  }

  state = {
    lists: [],
    sidebarIsOpen: false, // only affects mobile
    searchWords: "",
    nowPlayingMovies: [],
    nowAiringTVShows: [],
  }

  setNowPlayingMovies = (nowPlayingMovies) => {
    this.setState({ nowPlayingMovies });
  }

  setNowAiringTVShows = (nowAiringTVShows) => {
    this.setState({ nowAiringTVShows });
  }

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
  }

  searchHandler = (query) => {
    this.setSearchbarValue(query);
    this.props.history.push(`/search?query=${query}`);
  }

  setSearchbarValue = (searchWords) => {
    this.setState({ searchWords });
  }

  signOut = () => {
    // TODO what happens when the sign out button is clicked
    console.log("sign out clicked");
  }

  render() {
    const { lists, sidebarIsOpen, nowPlayingMovies, nowAiringTVShows } = this.state;
    const sidebarOverlay = (
      <div
        id="overlay"
        className={sidebarIsOpen ? "open" : "closed"}
        onClick={this.closeSidebar}
        role="presentation"
      />
    );

    return (
      <ScrollToTop>
        {sidebarOverlay}
        <Sidebar isOpen={sidebarIsOpen} closeSidebar={this.closeSidebar} lists={lists} />
        <div id="main-container">
          <Header
            username="Robert Kindwall"
            toggleSidebar={this.toggleSidebar}
            searchHandler={this.searchHandler}
            setSearchbarValue={this.setSearchbarValue}
            searchbarValue={this.state.searchWords}
            onSignOutClick={this.signOut}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomepageContainer
                  movies={nowPlayingMovies}
                  series={nowAiringTVShows}
                  setNowPlayingMovies={this.setNowPlayingMovies}
                  setNowAiringTVShows={this.setNowAiringTVShows}
                />)}
            />
            <Route path="/search" component={SearchpageContainer} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default withRouter(App);
