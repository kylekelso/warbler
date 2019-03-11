import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { logoutUser } from "../store/actions";
import M from "materialize-css";
import imgLogo from "../images/warbler-logo.png";

class Navbar extends Component {
  componentDidMount() {
    var NAV_REF = document.querySelector(".sidenav");
    M.Sidenav.init(NAV_REF);
  }

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
            <Link to="/i/settings">Settings</Link>
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
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={`/${this.props.auth.user.username || ""}`}
              className="brand-logo"
            >
              <img src={imgLogo} alt="" />
              Warbler
            </Link>
            <a
              href="#!"
              data-target="mobile-sidenav"
              className="sidenav-trigger right"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-sidenav">
          {this.renderContent()}
        </ul>
      </div>
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
