import { options } from "joi-browser";
import React from "react";

// name, Label, errors

const Select = ({ name, label, options, errors, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control form-select"
      >
        <option value="">Select One Value</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Select;
