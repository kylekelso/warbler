import React from "react";
import * as Yup from "yup";
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

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required field."),
  password: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match.")
    .required("Required field."),
  profileImgUrl: Yup.string().url("Must be a valid URL.")
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required field."),
  password: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field.")
});

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
    case "passwordConfirm":
      return "Confirm Password";
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
      return ".{8,30}";
    case "password":
      return ".{8,30}";
    case "passwordConfirm":
      return ".{8,30}";
    default:
      return null;
  }
};
