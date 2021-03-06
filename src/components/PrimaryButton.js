import React from "react";
import "./PrimaryButton.scss";

/**
 * Reusable button with the primary button style
 */
function PrimaryButton(props) {
  return <button {...props} className="primary-btn" />;
}

export default PrimaryButton;
