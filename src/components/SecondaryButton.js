import React from "react";
import { Link } from "react-router-dom";
import "../css/SecondaryButton.scss";

/**
 * Reusable button with the secondary button style
 */
function SecondaryButton(props) {
  return (
    <Link {...props} className="secondary-btn" />
  );
}

export default SecondaryButton;
