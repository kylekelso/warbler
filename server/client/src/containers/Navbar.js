import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  renderContent() {
    switch (this.props.auth.isAuthenticated) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <Link to="/i/login">Login</Link>
          </li>,
          <li key="2">
            <Link to="/i/register">Register</Link>
          </li>
        ];
      default:
        return [
          <li key="1">
            <Link to="/u/settings">Settings</Link>
          </li>,
          <li key="2">
            <Link to="/i/logout" onClick={this.logout}>
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

export default connect(mapStateToProps)(Navbar);
