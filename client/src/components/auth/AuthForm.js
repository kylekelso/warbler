import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import M from "materialize-css";

class AuthForm extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  renderInput = ({ input, label, type, meta }) => {
    return (
      <div className="input-field col s12">
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          className="validate"
          required={type === "url" ? false : true}
          pattern={
            label === "Username" || label === "Password" ? ".{3,20}" : null
          }
        />

        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <span className="helper-text" data-error={error} data-success="Good!" />
      );
    }
  };

  onSubmit = formVals => {
    this.props.onSubmit(formVals);
  };

  render() {
    return (
      <form
        className="col s8 offset-s2"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="row">
          {this.props.authType === "Register" && (
            <Field
              name="username"
              label="Username"
              type="text"
              component={this.renderInput}
            />
          )}
          <Field
            name="email"
            label="Email"
            type="email"
            component={this.renderInput}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={this.renderInput}
          />
          {this.props.authType === "Register" && (
            <Field
              name="profileImgUrl"
              label="https://example.com"
              type="url"
              pattern="https://."
              component={this.renderInput}
            />
          )}
          <button
            className="btn waves-effect waves-light right"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    );
  }
}

const validate = ({ username, email, password, profileImgUrl }) => {
  const errors = {};

  if (!username) {
    errors.username = "Required field.";
  } else if (3 > username.length || username.length > 20) {
    errors.username = "Must be between 3 and 20 characters.";
  }
  if (!email) {
    errors.email = "Required field.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!password) {
    errors.password = "Required field.";
  } else if (3 > password.length || password.length > 20) {
    errors.password = "Must be between 3 and 20 characters.";
  }
  if (profileImgUrl) {
    var type = ["jpeg", "jpg", "gif", "png"];
    var extension = profileImgUrl.substring(profileImgUrl.lastIndexOf(".") + 1);

    if (!profileImgUrl.toLowerCase().startsWith("https://")) {
      errors.profileImgUrl = "Must start with Https://";
    } else if (type.indexOf(extension) < 0) {
      errors.profileImgUrl = "Acceptable extensions: jpeg, jpg, gif, and png";
      /****  further error checking *****/
      // let res = await axios.head(profileImgUrl);
      // if (res.headers["content-type"].indexOf("image") === -1) {
      //   errors.profileImgUrl = "Url is not an image.";
      // }
    }
  }

  return errors;
};

export default reduxForm({
  form: "auth",
  validate
})(AuthForm);
