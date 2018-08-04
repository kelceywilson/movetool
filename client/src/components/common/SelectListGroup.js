import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select name={name} value={value} onChange={onChange}>
        {selectOptions}
      </select>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
