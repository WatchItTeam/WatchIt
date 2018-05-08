import React from "react";
import PropTypes from "prop-types";
import parseName from "../utils/parseName";

/**
 * Radio button with label for the ListPickerModal component
 */
function ListPickerRadio({ value, current, onChange }) {
  return (
    <label htmlFor={`listform-${value}`}>
      <input
        type="radio"
        name="chosen-list"
        id={`listform-${value}`}
        value={value}
        checked={value === current}
        onChange={onChange}
      /> {parseName(value)}
    </label>
  );
}

ListPickerRadio.defaultProps = {
  current: "",
};

ListPickerRadio.propTypes = {
  value: PropTypes.string.isRequired,
  current: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ListPickerRadio;
