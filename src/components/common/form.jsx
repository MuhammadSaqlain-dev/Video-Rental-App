import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;

    {
      this.doSubmit();
    }
  };

  validateChange = ({ name, value }) => {
    const props = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(props, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorsMessage = this.validateChange(input);
    if (errorsMessage) errors[input.name] = errorsMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput = (label, name, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };

  renderSelect = (label, name, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        label={label}
        name={name}
        options={options}
        errors={errors[name]}
        onChange={this.handleChange}
        value={data[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
