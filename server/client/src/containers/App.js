import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Main from "./Main";
import Spinner from "./../components/spinner";
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
          {this.props.auth.isAuthenticated === null ? <Spinner /> : <Main />}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { getSession }
)(App);
