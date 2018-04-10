import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";
import "../css/App.scss";
import Homepage from "../components/Homepage";
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
  }

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  }

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
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
        {/* temporary placement of menu toggle btn */}
        <button id="toggle-btn" onClick={this.toggleSidebar}>
          <i className="fa fa-bars" />
        </button>
        {sidebarOverlay}
        <Sidebar isOpen={sidebarIsOpen} closeSidebar={this.closeSidebar} lists={lists} />

        <div id="main-container">
          <Switch>
            <Route exact path="/" render={() => <HomepageContainer />} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default withRouter(App);
