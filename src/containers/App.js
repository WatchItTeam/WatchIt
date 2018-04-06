import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

class App extends Component {
  state = {
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" render={() => <div>Hello world!</div>} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
