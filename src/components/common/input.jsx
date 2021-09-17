import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input name={name} id={name} {...rest} className="form-control" />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
