import React from "react";
import { ErrorMessage } from "formik";

export function renderInput({ field, ...props }) {
  switch (field.name) {
    case "description":
      return _createTextArea(field, props);
    case "text":
      return _createTextArea(field, props);
    default:
      return _createInput(field, props);
  }
}

const _createTextArea = function(field, { className, ...props }) {
  return (
    <div className={className}>
      <textarea
        {...field}
        {...props}
        id="post_textarea"
        data-length="160"
        className="materialize-textarea"
      />
      <label htmlFor="post_textarea">{props.label}</label>
      <ErrorMessage name={field.name}>
        {error => <span className="helper-text" data-error={error} />}
      </ErrorMessage>
    </div>
  );
};

const _createInput = function(field, { className, ...props }) {
  let innerClass = _getInnerClass(field, props.form);
  return (
    <div className={className}>
      <label>{props.label}</label>
      <input {...field} {...props} className={innerClass} autoComplete="off" />
      <ErrorMessage name={field.name}>
        {error => {
          return <span className="helper-text" data-error={error} />;
        }}
      </ErrorMessage>
    </div>
  );
};

const _getInnerClass = function(field, { errors, touched, status }) {
  let innerClass = "";
  if (Object.keys(errors).length > 0 && touched.hasOwnProperty(field.name)) {
    innerClass = errors.hasOwnProperty(field.name) ? "invalid" : "valid";
  }
  return innerClass;
};
