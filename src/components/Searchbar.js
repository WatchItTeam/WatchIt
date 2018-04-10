import React from "react";
import PropTypes from "prop-types";
import "../css/Searchbar.scss";

function Searchbar({ value, onChange }) {
  return (
    <div className="searchbar">
      <i className="fa fa-search search-icon" />
      <input type="text" value={value} onChange={onChange} placeholder="Search" />
    </div>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Searchbar;
