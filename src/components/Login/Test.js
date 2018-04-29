import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import firebase from "../../Firebase/firebase";
import LoginButton from "./LoginButton";

function Test({
  username, onSignOutClick, handleChange, signInClick, signUpClick, email, password,
}) {
  const user = firebase.auth().currentUser;
  if (user) {
    return (
      <div id="user-info">
        <div className="user-img" />
        {username}
        <button onClick={onSignOutClick}>
          <FontAwesomeIcon icon="sign-out-alt" /> Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="Loginwindow">
      <div className="emailbar">
        <input type="email" value={email} onChange={handleChange} placeholder="Email" />
      </div>
      <div className="passbar">
        <input type="password" value={password} onChange={handleChange} placeholder="Password" />         
      </div>
      <div className="signupandin">
        <LoginButton onClick={signInClick}>Sign in</LoginButton>
        <LoginButton onClick={signUpClick}>Sign up</LoginButton>
      </div>
    </div>
  );
}

Test.propTypes = {
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  signUpClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Test;
