import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import auth from "./../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: joi.string().required().label("Username"),
    password: joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      // Call The Server
      const { data } = this.state;
      await auth.loginUser(data.username, data.password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  createRef = React.createRef();

  render() {
    return (
      <div className="container">
        <h3 className="mb-4">Login Form </h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username")}
          {this.renderInput("Password", "password", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
