import React, { Component, Fragment as F } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/LoginHandler.scss";
import firebase from "../../Firebase/firebase";
import Test from "./Test";
// import LoginButton from "./LoginButton";

// import PropTypes from "prop-types";

class LoginHandler extends Component {
  static propTypes = {

  }
  state = {
    email: "",
    password: "",
    user: null,
  };
  signUpClick = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  signInClick = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
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
    return (
      <F>
        <Test
          {...this.props}
          onSignOutClick={this.signOut}
          handleChange={this.handleChange}
          signInClick={this.signInClick}
          signUpClick={this.signUpClick}
          user={this.state.user}
        />
      </F>
    );
  }
}

LoginHandler.propTypes = {
};
export default withRouter(LoginHandler);
