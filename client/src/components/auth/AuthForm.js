import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { renderInput, validate } from "./../../utils/fieldHelper";
import M from "materialize-css";

class AuthForm extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const initialValues =
      this.props.authType === "Register"
        ? {
            username: "",
            email: "",
            password: "",
            profileImgUrl: ""
          }
        : {
            email: "",
            password: ""
          };
    return (
      <Formik
        initialValues={initialValues}
        validate={values => validate(values, this.props.authType)}
        onSubmit={values => this.props.onSubmit(values)}
      >
        <Form className="col s8 offset-s2">
          {this.props.authType === "Register" && (
            <Field type="text" name="username" component={renderInput} />
          )}
          <Field type="email" name="email" component={renderInput} />
          <Field type="password" name="password" component={renderInput} />
          {this.props.authType === "Register" && (
            <Field type="url" name="profileImgUrl" component={renderInput} />
          )}
          <button className="btn waves-effect waves-light right" type="submit">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </Form>
      </Formik>
    );
  }
}

export default AuthForm;
