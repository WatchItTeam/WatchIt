import React, { Component } from "react";
import "../css/LoginPage.scss";
import firebase from "../Firebase/firebase";
import LoginButton from "./LoginButton";
// import PropTypes from "prop-types";

class LoginPage extends Component {
  static propTypes = {

  }
  state = {
    email: "",
    password: "",
  };
  // componentDidMount() {
  // }

  signUpClick = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
    });
  }

  signInClick = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
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
      <div className="Loginwindow">
        <div className="emailbar">
          <input type="email" value={this.email} onChange={this.handleChange} placeholder="Email" />
        </div>
        <div className="passbar">
          <input type="password" value={this.password} onChange={this.handleChange} placeholder="Password" />         
        </div>
        <div className="signupandin">
          <LoginButton onClick={this.signInClick}>Sign in</LoginButton>
          <LoginButton onClick={this.signUpClick}>Sign up</LoginButton>
        </div>
      </div>
        
    );
  }
}
export default LoginPage;
