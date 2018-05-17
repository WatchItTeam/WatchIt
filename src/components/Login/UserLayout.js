import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../../css/LoginButton.scss";
import { SignedIn, SignedOut } from "../UserState/UserState";
import { Mobile, Desktop } from "../Responsive";
import PrimaryButton from "../PrimaryButton";

function UserLayout({
  onSignOutClick, handleChange, signInClick, signUpClick, email, password,
}) {
  // Render user info if signed in, signin-bars otherwise
  return (
    <Fragment>
      <Desktop>
        <SignedIn>
          {user => (
            <div id="user-info">
              {/* Github style avatar generated based in the user's uid */}
              <img
                className="user-img"
                src={`https://avatars.dicebear.com/v2/identicon/${user.uid}.svg`}
                alt="User avatar"
              />
              {user.email}
              <button onClick={onSignOutClick}>
                <FontAwesomeIcon icon="sign-out-alt" /> Sign out
              </button>
            </div>
        )}
        </SignedIn>
        <SignedOut>
          <div className="Loginwindow user-info">
            <form onSubmit={signInClick}>
              <div className="loginBars">
                <input
                  id="emailBar"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  id="passBar"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button className="login-btn">Log in</button>
                <button className="signupButton" onClick={signUpClick}>Sign up</button>
              </div>
            </form>
          </div>
        </SignedOut>
      </Desktop>
      <Mobile>
        <div>
          <form onSubmit={signInClick}>
            <div className="loginBarsMobile">
              <input
                id="emailBar"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                id="passBar"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="login-btn-mobile">
              <PrimaryButton>Log in</PrimaryButton>
            </div>
            <div className="signup-btn-mobile">
              <button className="signupButton" onClick={signUpClick}>Sign up</button>
            </div>
          </form>
        </div>
      </Mobile>
    </Fragment>
  );
}

UserLayout.defaultProps = {
  email: "",
  password: "",
};

UserLayout.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  signUpClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default UserLayout;
