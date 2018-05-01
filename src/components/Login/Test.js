import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import LoginButton from "./LoginButton";

function Test({
  user, onSignOutClick, handleChange, signInClick, signUpClick, email, password,
}) {
  if (user) {
    return (
      <div id="user-info">
        <div className="user-img" />
        {user.email}
        <button onClick={onSignOutClick}>
          <FontAwesomeIcon icon="sign-out-alt" /> Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="Loginwindow user-info">
      <div className="loginBars">
        <input id="emailBar" type="email" value={email} onChange={handleChange} placeholder="Email" />
        <input id="passBar" type="password" value={password} onChange={handleChange} placeholder="Password" />         
        <LoginButton onClick={signInClick}>Log in</LoginButton>
        <button id="signupButton" onClick={signUpClick}>Sign up</button>
      </div>
    </div>
  );
}

Test.propTypes = {
  user: PropTypes.any.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  signUpClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Test;
