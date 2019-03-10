import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import ProfilePage from "./ProfilePage";
import SettingsPage from "../components/SettingsPage";

const Landing = () => <h2 className="home-hero">Welcome to Warbler!</h2>; //will login and join here

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
