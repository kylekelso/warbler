import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProfilePage from "../containers/ProfilePage";
import SettingsPage from "./SettingsPage";
import LandingPage from "./LandingPage";

class Main extends Component {
  render() {
    return (
      <div className="row">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/i/settings" component={SettingsPage} />
          <Route path="/:username" component={ProfilePage} />
        </Switch>
      </div>
    );
  }
}

export default Main;
