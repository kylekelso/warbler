import React from "react";
import { ErrorMessage } from "formik";

export function renderInput({ field, ...props }) {
  switch (field.name) {
    case "description":
      return;
    case "text":
      return _createTextArea(field, props);
    default:
      return _createInput(field, props);
  }
}

export function validate(
  { username, email, password, profileImgUrl },
  authType
) {
  const errors = {};

  if (!username && authType === "Register") {
    errors.username = "Required field.";
  } else if (3 > username.length || username.length > 20) {
    errors.username = "Must be between 3 and 20 characters.";
  }
  if (!email) {
    errors.email = "Required field.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!password) {
    errors.password = "Required field.";
  } else if (3 > password.length || password.length > 20) {
    errors.password = "Must be between 3 and 20 characters.";
  }

  if (profileImgUrl && authType === "Register") {
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
  console.log(errors);
  return errors;
}

const _createTextArea = function(field, props) {
  return (
    <div className="input-field col s10">
      <textarea
        {...field}
        {...props}
        id="post_textarea"
        data-length="160"
        className="materialize-textarea validate"
        required={_propRequired(props.type)}
      />
      <label htmlFor="post_textarea">Post a Warble!</label>
      <ErrorMessage name={field.name}>
        {error => <span className="helper-text" data-error={error} />}
      </ErrorMessage>
    </div>
  );
};

const _createInput = function(field, props) {
  return (
    <div className="input-field col s12">
      <label>{_fieldLabel(field.name)}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className="validate"
        required={_propRequired(props.type)}
        pattern={_propPattern(props.type)}
      />
      <ErrorMessage name={field.name}>
        {error => <span className="helper-text" data-error={error} />}
      </ErrorMessage>
    </div>
  );
};

const _fieldLabel = function(name) {
  switch (name) {
    case "username":
      return "Username";
    case "email":
      return "Email";
    case "password":
      return "Password";
    case "profileImgUrl":
      return "Image URL";
    default:
      return name;
  }
};

const _propRequired = function(type) {
  switch (type) {
    case "description":
      return false;
    case "url":
      return false;
    default:
      return true;
  }
};

const _propPattern = function(type) {
  switch (type) {
    case "email":
      return "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$";
    case "text":
      return ".{3,20}";
    case "password":
      return ".{3,20}";
    default:
      return null;
  }
};
