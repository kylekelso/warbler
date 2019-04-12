import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileSection from "../containers/settingsPage/profileSection";
import PrivacySection from "../containers/settingsPage/privacySection";
import AccPassSection from "../containers/settingsPage/accPassSection";
import Navbar from "../containers/Navbar";
import M from "materialize-css";
import "./SettingsPage.css";

class SettingsPage extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/a/login");
    } else if (this.props.auth.isAuthenticated === true) {
      M.AutoInit();
      M.updateTextFields();
    }
  }

  renderProfileSection() {
    return (
      <li className="active" id="profile">
        <div className="collapsible-header">
          <i className="material-icons">web</i>Profile Settings
        </div>
        <div className="collapsible-body">
          <ProfileSection />
        </div>
      </li>
    );
  }

  renderPrivacySection() {
    return (
      <li id="privacy">
        <div className="collapsible-header">
          <i className="material-icons">security</i>Privacy &amp; Security
          Settings &nbsp; <strong>(Under Construction)</strong>
        </div>
        <div className="collapsible-body">
          <PrivacySection />
        </div>
      </li>
    );
  }

  renderAccountSection() {
    return (
      <li id="account">
        <div className="collapsible-header">
          <i className="material-icons">account_circle</i>Account Settings
        </div>
        <div className="collapsible-body">
          <ul className="collapsible z-depth-0">
            <li id="accPassword">
              <div className="collapsible-header">
                <i className="material-icons">vpn_key</i>Change Password
              </div>
              <div className="collapsible-body">
                <AccPassSection />
              </div>
            </li>
            <li id="accEmail">
              <div className="collapsible-header">
                <i className="material-icons">email</i>Change Email &nbsp;
                <strong>(Under Construction)</strong>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="input-field inline col s12">
                    <input id="email" name="email" type="email" />
                    <label htmlFor="email">New Email</label>
                  </div>
                  <div className="waves-effect waves-green light-blue darken-2 btn col right">
                    Save <i className="material-icons right">send</i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <ul className="collapsible popout">
            {this.renderProfileSection()}
            {this.renderPrivacySection()}
            {this.renderAccountSection()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SettingsPage);
