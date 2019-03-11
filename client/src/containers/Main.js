import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./settingsPage";

const Landing = () => {
  return (
    <div>
      <h2 className="home-hero">
        Welcome to Warbler!
        <div className="row">
          <Link
            id="loginBtn"
            to="/a/login"
            className="waves-effect waves-green light-blue darken-2 btn col left"
          >
            <i className="material-icons left">vpn_key</i>Login
          </Link>
          <Link
            id="registerBtn"
            to="/a/register"
            className="waves-effect waves-green light-blue darken-2 btn col right"
          >
            <i className="material-icons left">person_add</i>Register
          </Link>
        </div>
      </h2>
    </div>
  );
};
const loginForm = props => <AuthForm history={props.history} />;
const registerForm = props => <AuthForm history={props.history} />;

class Main extends Component {
  render() {
    return (
      <div className="row">
        <div className="col m12 l10 offset-l1">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/a/login" component={loginForm} />
            <Route exact path="/a/register" component={registerForm} />
            <Route exact path="/i/settings" component={SettingsPage} />
            <Route path="/:username" component={ProfilePage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
