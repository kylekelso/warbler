import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

const Landing = () => <h2>Landing</h2>; //will login and join here

class Main extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s10 offset-1">
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
