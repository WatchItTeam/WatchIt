import React, { Component } from "react";
// import PropTypes from "prop-types";
import LoginPage from "../components/LoginPage";
import ErrorMessage from "../components/ErrorMessage";

class LoginPageContainer extends Component {
  static propTypes = {
  }

  state = {
    error: false,
  }

  componentDidMount() {
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorMessage>Oops! Could not load login page :(</ErrorMessage>
      );
    }

    return (
      <LoginPage />
    );
  }
}

export default LoginPageContainer;
