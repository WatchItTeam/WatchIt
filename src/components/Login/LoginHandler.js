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
  };
  signUpClick = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    this.props.setUsername(this.state.email);
    this.forceUpdate();
  }

  signInClick = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    this.props.setUsername(this.state.email);
    this.forceUpdate();
  }

  componentWillMount() {
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
          handleChange={this.handleChange}
          signInClick={this.signInClick}
          signUpClick={this.signUpClick}
          email={this.state.email}
          password={this.state.password}
          // username={this.username}
          // onSignOutClick={this.onSignOutClick}
        />
      </F>
    );
  }
}

LoginHandler.propTypes = {
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};
export default withRouter(LoginHandler);
