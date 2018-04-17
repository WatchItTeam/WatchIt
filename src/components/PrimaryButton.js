import React from "react";
import "../css/PrimaryButton.scss";

function PrimaryButton(props) {
  return (
    <button {...props} className="primary-btn" />
  );
}

export default PrimaryButton;
