import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../../css/LoginButton.scss";


function UserLayout({
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
      <form onSubmit={signInClick}>
        <div className="loginBars">
          <input id="emailBar" type="email" value={email} onChange={handleChange} placeholder="Email" />
          <input id="passBar" type="password" value={password} onChange={handleChange} placeholder="Password" />
          <button className="login-btn">Log in</button>
          <button id="signupButton" onClick={signUpClick}>Sign up</button>
        </div>
      </form>
    </div>
  );
}

UserLayout.propTypes = {
  user: PropTypes.any.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  signUpClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default UserLayout;
