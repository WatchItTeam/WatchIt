import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";
import "../css/App.scss";

class App extends Component {
  state = {
    lists: [],
  }

  render() {
    const { lists } = this.state;
    return (
        <ScrollToTop>
          <Sidebar lists={lists} />
          <div id="main-container">
            <Switch>
              <Route exact path="/" render={() => <div>Hello world!</div>} />
              <Route render={() => <div>404</div>} />
            </Switch>
          </div>
        </ScrollToTop>
    );
  }
}

export default App;
