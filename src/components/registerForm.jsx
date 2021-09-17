import React from "react";
import Form from "./common/form";
import joi from "joi-browser";
import { registerUser } from "./../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: joi.string().required().label("Username").email(),
    password: joi.string().required().label("Password").min(3).max(10),
    name: joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      // Call The Server
      const response = await registerUser(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h3>Register Form</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username")}
          {this.renderInput("Password", "password", "password")}
          {this.renderInput("Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
