import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { logoutUser } from "../store/actions";

class Navbar extends Component {
  logout = async e => {
    e.preventDefault();
    await this.props.logoutUser();

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };
  renderContent() {
    switch (this.props.auth.isAuthenticated) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <Link to="/a/login">Login</Link>
          </li>,
          <li key="2">
            <Link to="/a/register">Register</Link>
          </li>
        ];
      default:
        return [
          <li key="1">
            <Link to="/u/settings">Settings</Link>
          </li>,
          <li key="2">
            <Link to="/a/logout" onClick={this.logout}>
              Logout
            </Link>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s12">
              <Link to="/" className="brand-logo">
                Warbler
              </Link>
              <ul className="right"> {this.renderContent()} </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
