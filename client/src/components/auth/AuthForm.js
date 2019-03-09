import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import {
  renderInput,
  loginSchema,
  signupSchema
} from "./../../utils/fieldHelper";
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
            passwordConfirm: "",
            profileImgUrl: ""
          }
        : {
            email: "",
            password: ""
          };
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={
          this.props.authType === "Register" ? signupSchema : loginSchema
        }
        onSubmit={values => this.props.onSubmit(values)}
      >
        <Form className="col s8 offset-s2">
          {this.props.authType === "Register" && (
            <Field type="text" name="username" component={renderInput} />
          )}
          <Field type="email" name="email" component={renderInput} />
          <Field type="password" name="password" component={renderInput} />

          {this.props.authType === "Register" && (
            <div>
              <Field
                type="password"
                name="passwordConfirm"
                component={renderInput}
              />
              <Field type="url" name="profileImgUrl" component={renderInput} />
            </div>
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
