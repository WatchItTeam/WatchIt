import React from "react";
import "../../css/LoginButton.scss";

/**
 * Reusable button with the primary button style
 */
function LoginButton(props) {
  return (
    <button {...props} className="login-btn" />
  );
}

export default LoginButton;
