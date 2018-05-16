import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserLayout from "./UserLayout";
import { errorToast } from "../../utils/toast";
import "../../css/LoginHandler.scss";
import { signIn, signOut, signUp } from "../../Firebase/UserUtils";

class LoginHandler extends Component {
  state = {
    email: "",
    password: "",
  };

  signUpClick = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    signUp(email, password)
      .catch((error) => {
        errorToast(error.message);
      });
  }

  signInClick = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    signIn(email, password)
      .catch((error) => {
        errorToast(error.message);
      });
  }

  signOutClick = () => {
    signOut();
    this.setState({ email: "", password: "" });
  }

  handleChange = (event) => {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
    if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <UserLayout
        onSignOutClick={this.signOutClick}
        handleChange={this.handleChange}
        signInClick={this.signInClick}
        signUpClick={this.signUpClick}
        email={email}
        password={password}
      />
    );
  }
}

export default withRouter(LoginHandler);
