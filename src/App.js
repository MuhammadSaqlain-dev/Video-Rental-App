import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import auth from "./services/authService";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/proctedRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute path="/movies/:id" component={MoviesForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
