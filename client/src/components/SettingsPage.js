import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { renderInput } from "./../utils/fieldHelper";
import { updateUser } from "../store/actions";
import DefaultProfileImg from "../images/default-profile-image.jpg";
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
    const { profileImgUrl } = this.props.auth.user;
    return (
      <li className="active">
        <div className="collapsible-header">
          <i className="material-icons">web</i>Profile Settings
        </div>
        <div className="collapsible-body">
          <Form className="row" id="profileSettingsForm">
            <Field
              className="input-field col s12"
              type="text"
              label="Username"
              name="username"
              component={renderInput}
            />
            <Field
              className="input-field col s12 m7"
              type="url"
              label="Image URL"
              name="profileImgUrl"
              component={renderInput}
            />
            <div className="col s8 offset-s2 m5 center-align">
              <img
                id="settingsImage"
                src={profileImgUrl || DefaultProfileImg}
                alt=""
                className="circle"
              />
            </div>
            <Field
              className="input-field col s12"
              label="Description"
              name="description"
              component={renderInput}
            />
            <button
              className="waves-effect waves-green light-blue darken-2 btn col right"
              type="submit"
              name="action"
            >
              Save <i className="material-icons right">send</i>
            </button>
          </Form>
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

function mapStateToProps({ auth }) {
  return { auth };
}

const defaultFormVals = props => {
  let { username, profileImgUrl, description } = props.auth.user;
  return {
    username,
    profileImgUrl,
    description
  };
};

SettingsPage = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  handleSubmit: (values, { props }) => {
    values.updateType = "profile";
    props.updateUser(props.auth.user.username, values);
  }
})(SettingsPage);

export default connect(
  mapStateToProps,
  { updateUser }
)(SettingsPage);
