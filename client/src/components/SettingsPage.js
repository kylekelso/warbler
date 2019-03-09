import React, { Component } from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import M from "materialize-css";
import "./SettingsPage.css";

class SettingsPage extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  renderProfileSection() {
    return (
      <li className="active">
        <div className="collapsible-header">
          <i className="material-icons">web</i>Profile Settings
        </div>
        <div className="collapsible-body">
          <div className="row">
            <div className="input-field inline col s12">
              <input id="username" name="username" type="text" />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s10">
              <input id="profileImgUrl" name="profileImgUrl" type="url" />
              <label htmlFor="profileImgUrl">Image URL</label>
            </div>
            <div className="col s2">
              <img
                id="settingsImage"
                src={DefaultProfileImg}
                alt=""
                className="circle"
              />
            </div>
            <div className="input-field col s12">
              <textarea
                id="description"
                name="description"
                type="text"
                className="materialize-textarea"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="waves-effect waves-green light-blue darken-2 btn col right">
              Save <i className="material-icons right">send</i>
            </div>
          </div>
        </div>
      </li>
    );
  }

  renderPrivacySection() {
    return (
      <li>
        <div className="collapsible-header">
          <i className="material-icons">security</i>Privacy &amp; Security
          Settings
        </div>
        <div className="collapsible-body">
          <div className="row">
            <div className="col s12">
              <div className="left">Private Profile</div>
              <div className="switch right">
                <label>
                  Off
                  <input type="checkbox" />
                  <span className="lever" />
                  On
                </label>
              </div>
            </div>
            <div className="col s12">
              <p>Other users cannot see your profile.</p>
            </div>
          </div>
        </div>
      </li>
    );
  }

  renderAccountSection() {
    return (
      <li>
        <div className="collapsible-header">
          <i className="material-icons">account_circle</i>Account Settings
        </div>
        <div className="collapsible-body">
          <ul className="collapsible z-depth-0">
            <li>
              <div className="collapsible-header">
                <i className="material-icons">vpn_key</i>Change Password
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="input-field inline col s12">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                    />
                    <label htmlFor="oldPassword">Old Password</label>
                  </div>
                  <div className="input-field inline col s12">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                    />
                    <label htmlFor="newPassword">New Password</label>
                  </div>
                  <div className="input-field inline col s12">
                    <input
                      id="retypePassword"
                      name="retypePassword"
                      type="password"
                    />
                    <label htmlFor="retypePassword">Re-Type New Password</label>
                  </div>
                  <div className="waves-effect waves-green light-blue darken-2 btn col right">
                    Save <i className="material-icons right">send</i>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <i className="material-icons">email</i>Change Email
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
      <div className="container">
        <br />
        <ul className="collapsible popout">
          {this.renderProfileSection()}
          {this.renderPrivacySection()}
          {this.renderAccountSection()}
        </ul>
      </div>
    );
  }
}

export default SettingsPage;
