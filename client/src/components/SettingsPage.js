import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { renderInput } from "./../utils/fieldHelper";
import { settingsSchema } from "./../utils/validationHelper";
import { updateUser } from "../store/actions";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import M from "materialize-css";
import "./SettingsPage.css";

class SettingsPage extends Component {
  state = { updateType: "profile" };
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/a/login");
    } else if (this.props.auth.isAuthenticated === true) {
      M.AutoInit();
      M.updateTextFields();
      var elems = document.querySelectorAll(".collapsible");
      M.Collapsible.init(elems, {
        onOpenStart: this.setFormType.bind(this)
      });
    }
  }

  setFormType = function(el) {
    if (el.id === "accPassword") {
      this.props.resetForm({
        ...this.props.initialValues,
        updateType: el.id,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    } else {
      this.props.resetForm({ ...this.props.initialValues, updateType: el.id });
    }
  };

  renderProfileSection() {
    const { profileImgUrl } = this.props.auth.user;
    return (
      <li className="active" id="profile">
        <div className="collapsible-header">
          <i className="material-icons">web</i>Profile Settings
        </div>
        <div className="collapsible-body">
          <Form className="row">
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
      <li id="privacy">
        <div className="collapsible-header">
          <i className="material-icons">security</i>Privacy &amp; Security
          Settings
        </div>
        <div className="collapsible-body">
          <Form className="row">
            <div className="col s12">
              <div className="left">Private Profile</div>
              <div className="switch right">
                <label>
                  Off
                  <Field
                    name="privateProfile"
                    type="checkbox"
                    component="input"
                    checked={this.props.values.privateProfile}
                  />
                  <span className="lever" />
                  On
                </label>
              </div>
            </div>
            <div className="col s12">
              <p>Other users cannot see your profile.</p>
            </div>
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
                <Form className="row">
                  <Field
                    className="input-field col s12"
                    type="password"
                    label="Old Password"
                    name="oldPassword"
                    component={renderInput}
                  />
                  <Field
                    className="input-field col s12"
                    type="password"
                    label="New Password"
                    name="newPassword"
                    component={renderInput}
                  />
                  <Field
                    className="input-field col s12"
                    type="password"
                    label="Confirm New Password"
                    name="confirmNewPassword"
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
            <li id="accEmail">
              <div className="collapsible-header">
                <i className="material-icons">email</i>Change Email
              </div>
              <div className="collapsible-body">
                <Form className="row">
                  <div className="input-field inline col s12">
                    <input id="email" name="email" type="email" />
                    <label htmlFor="email">New Email</label>
                  </div>
                  <div className="waves-effect waves-green light-blue darken-2 btn col right">
                    Save <i className="material-icons right">send</i>
                  </div>
                </Form>
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

function hasChanged(changedObj, current) {
  if (changedObj.oldPassword !== changedObj.newPassword) {
    return true;
  }

  for (var key in changedObj) {
    if (key in current && current[key] !== changedObj[key]) {
      return true;
    }
  }
  return false;
}

function mapStateToProps({ auth }) {
  return { auth };
}

const defaultFormVals = props => {
  let {
    username,
    profileImgUrl,
    description,
    privateProfile
  } = props.auth.user;
  return {
    updateType: "profile",
    username,
    profileImgUrl,
    description,
    privateProfile,
    oldPassword: "password",
    newPassword: "password",
    confirmNewPassword: "password"
  };
};

SettingsPage = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: settingsSchema,
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    if (hasChanged(values, props.auth.user)) {
      var res, subset;
      switch (values.updateType) {
        case "profile":
          subset = (({ updateType, username, profileImgUrl, description }) => ({
            updateType,
            username,
            profileImgUrl,
            description
          }))(values);
          break;
        case "privacy":
          subset = (({ updateType, privateProfile }) => ({
            updateType,
            privateProfile
          }))(values);
          break;
        case "accPassword":
          subset = (({ updateType, oldPassword, newPassword }) => ({
            updateType,
            oldPassword,
            newPassword
          }))(values);
          break;
        case "accEmail":
          break;
        default:
          subset = {};
          break;
      }
      res = await props.updateUser(props.auth.user.username, subset);
      if (res && res.status !== 200) {
        let { message } = res.data.error;
        if (message.includes("credentials: invalid.")) {
          setErrors({
            oldPassword: "Wrong password."
          });
        } else if (message.includes("username:")) {
          setErrors({ username: "Username taken." });
        }
      } else {
        M.toast({ html: "Changes saved." });
      }
    } else {
      M.toast({ html: "No Changes made." });
    }

    setSubmitting(false);
  }
})(SettingsPage);

export default connect(
  mapStateToProps,
  { updateUser }
)(SettingsPage);
