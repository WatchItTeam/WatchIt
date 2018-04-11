import React from "react";
import PropTypes from "prop-types";
import "../css/ErrorMessage.scss";

function ErrorMessage({ children }) {
  return (
    <div className="error-text">{children}</div>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
