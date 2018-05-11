import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../css/LoginHandler.scss";
import firebase from "../../Firebase/firebase";
import UserLayout from "./UserLayout";

class LoginHandler extends Component {
  state = {
    email: "",
    password: "",
    user: null,
  };
  signUpClick = (event) => {
    console.log("Trying do sign in");
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    event.preventDefault();
  }

  signInClick = (event) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
    event.preventDefault();
  }

  signOut = () => {
    firebase.auth().signOut();
    this.setState({ email: "", password: "" });
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
      <UserLayout
        {...this.props}
        onSignOutClick={this.signOut}
        handleChange={this.handleChange}
        signInClick={this.signInClick}
        signUpClick={this.signUpClick}
        user={this.state.user}
      />
    );
  }
}

LoginHandler.propTypes = {
};
export default withRouter(LoginHandler);
