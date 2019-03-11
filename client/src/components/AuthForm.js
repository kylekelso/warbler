import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { setView, loginUser, registerUser } from "../store/actions";
import { renderInput } from "../utils/fieldHelper";
import { signupSchema, loginSchema } from "../utils/validationHelper";
import M from "materialize-css";

class AuthForm extends Component {
  componentDidMount() {
    M.AutoInit();
    if (this.props.auth.isAuthenticated) {
      console.log("redirected");
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  }

  render() {
    const { pathname } = this.props.history.location;
    return (
      <div className="row">
        <h3 className="col s8 offset-s2">
          {pathname === "/a/register" ? "Join Warbler!" : "Login"}
        </h3>
        <Form className="section col s8 offset-s2 z-depth-1" id="AuthForm">
          {pathname === "/a/register" && (
            <Field
              id="username"
              className="input-field col s12"
              type="text"
              label="Username"
              name="username"
              component={renderInput}
            />
          )}
          <Field
            id="email"
            className="input-field col s12"
            type="email"
            label="Email"
            name="email"
            component={renderInput}
          />
          <Field
            className="input-field col s12"
            type="password"
            label="Password"
            name="password"
            component={renderInput}
          />

          {pathname === "/a/register" && (
            <div>
              <Field
                className="input-field col s12"
                type="password"
                label="Confirm Password"
                name="passwordConfirm"
                component={renderInput}
              />
              <Field
                className="input-field col s12"
                type="url"
                label="Image URL"
                name="profileImgUrl"
                component={renderInput}
              />
            </div>
          )}
          <button className="btn waves-effect waves-light right" type="submit">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ auth, view }) {
  return { auth, view };
}

const defaultFormVals = props => {
  return props.history.location.pathname === "/a/register"
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
};

const schema = props => {
  return props.history.location.pathname === "/a/register"
    ? signupSchema
    : loginSchema;
};

AuthForm = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: props => schema(props),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const res =
      props.history.location.pathname === "/a/register"
        ? await props.registerUser(values)
        : await props.loginUser(values);

    if (res && res.status !== 200) {
      //handle error
      let { message } = res.data.error;
      if (message.includes("Credentials: Invalid.")) {
        setErrors({
          password: "Invalid credentials.",
          email: "Invalid credentials."
        });
      } else if (message.includes("email:")) {
        setErrors({ email: "Already registered." });
      } else if (message.includes("username:")) {
        setErrors({ username: "Username taken." });
      }
    }
    setSubmitting(false);
  }
})(AuthForm);

export default connect(
  mapStateToProps,
  { setView, loginUser, registerUser }
)(AuthForm);
