import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../css/App.scss";
import HomepageContainer from "./HomepageContainer";

class App extends Component {
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
  }

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
  }

  searchHandler = (e) => {
    this.setState({ searchWords: e.target.value });
    // TODO what happens when the search input changes
  }

  signOut = () => {
    // TODO what happens when the sign out button is clicked
    console.log("sign out clicked");
  }

  render() {
    const { lists, sidebarIsOpen } = this.state;
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
            onSearchChange={this.searchHandler}
            searchbarValue={this.state.searchWords}
            onSignOutClick={this.signOut}
          />
          <Switch>
            <Route exact path="/" component={HomepageContainer} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default withRouter(App);
