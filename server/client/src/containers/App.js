import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Main from "./Main";
import { getSession } from "../store/actions";

class App extends Component {
  async componentDidMount() {
    await this.props.getSession();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { getSession }
)(App);
