import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserProvider } from "../Firebase/UserContext";
import ScrollToTop from "../components/ScrollToTop";
import HomepageContainer from "./HomepageContainer";
import SearchpageContainer from "./SearchpageContainer";
import Sidebar from "../components/Sidebar";
import DynamicHeader from "../containers/DynamicHeader";
import DetailspageContainer from "./DetailspageContainer";
import UserList from "../containers/UserList";
import createDebouncedFunc from "../utils/createDebouncedFunc";
import LoginPageContainer from "./LoginPageContainer";
import "../css/App.scss";

const SEARCH_DEBOUNCE_TIME = 500;

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
    sidebarIsOpen: false, // only affects mobile
    searchWords: "",
    nowPlayingMovies: [],
    nowAiringTVShows: [],
    currentMovie: {},
    searchResults: {
      results: [],
      currentPage: null,
      totalResults: null,
      totalPages: null,
    },
  }

  setCurrentMovie = (currentMovie) => {
    this.setState({ currentMovie });
  }

  setNowPlayingMovies = (nowPlayingMovies) => {
    this.setState({ nowPlayingMovies });
  }

  setNowAiringTVShows = (nowAiringTVShows) => {
    this.setState({ nowAiringTVShows });
  }

  setSearchResults = (searchResults) => {
    this.setState({ searchResults });
  }

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
  }

  searchHandler = (query) => {
    this.setSearchbarValue(query);
    this.search(query);
  }

  search = createDebouncedFunc((query) => {
    // don't need to search if the user just clears the search bar
    if (query === "") return;
    this.props.history.push(`/search?query=${query}`);
  }, SEARCH_DEBOUNCE_TIME)

  setSearchbarValue = (searchWords) => {
    this.setState({ searchWords });
  }

  signOut = () => {
    // TODO what happens when the sign out button is clicked
    console.log("sign out clicked");
  }

  render() {
    const {
      sidebarIsOpen,
      nowPlayingMovies,
      nowAiringTVShows,
      searchResults,
      currentMovie,
    } = this.state;

    const sidebarOverlay = (
      <div
        id="overlay"
        className={sidebarIsOpen ? "open" : "closed"}
        onClick={this.closeSidebar}
        role="presentation"
      />
    );

    return (
      <UserProvider>
        <ScrollToTop>
          {sidebarOverlay}
          <Sidebar isOpen={sidebarIsOpen} closeSidebar={this.closeSidebar} />
          <div id="main-container">
            <DynamicHeader
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
              <Route
                exact
                path="/:mediaType(movie|tv)/:id"
                render={props => (
                  <DetailspageContainer
                    {...props}
                    currentMovie={currentMovie}
                    setCurrentMovie={this.setCurrentMovie}
                  />)}
              />
              <Route
                path="/login"
                render={() => (
                  <LoginPageContainer />)}
              />
              <Route
                path="/search"
                render={() => (
                  <SearchpageContainer
                    searchResults={searchResults}
                    setSearchResults={this.setSearchResults}
                  />
                )}
              />
              <Route exact path="/user/:userId/:listName/" render={() => <Redirect to="all" />} />
              <Route
                path="/user/:userId/:listName(watching|plan_to_watch|completed|dropped)/:mediaType(all|movies|tv)"
                component={UserList}
              />
              <Route render={() => <div>404</div>} />
            </Switch>
          </div>
        </ScrollToTop>
      </UserProvider>
    );
  }
}

export default withRouter(App);
