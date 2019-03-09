import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import ProfilePage from "./ProfilePage";
import SettingsPage from "../components/SettingsPage";

const Landing = () => <h2 className="home-hero">Welcome to Warbler!</h2>; //will login and join here

class Main extends Component {
  render() {
    return (
      <div className="row">
        <div className="col m12 l10 offset-l1">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/a/login" component={Login} />
            <Route exact path="/a/register" component={Register} />
            <Route exact path="/i/settings" component={SettingsPage} />
            <Route path="/:username" component={ProfilePage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
