import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { setView, loginUser, registerUser } from "../store/actions";
import { renderInput } from "../utils/fieldHelper";
import { signupSchema, loginSchema } from "../utils/validationHelper";
import M from "materialize-css";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = { authType: "login" };
  }
  componentDidMount() {
    M.AutoInit();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  }

  handleClick = (...args) => {
    if (this.state.authType === "login") {
      this.setState({ authType: "register" });
    } else {
      this.setState({ authType: "login" });
    }
  };

  render() {
    const { authType } = this.state;
    return (
      <Form
        id="AuthForm"
        className="section col l5 offset-l7 m8 offset-m2 s10 offset-s1"
      >
        <div className="row">
          <h4 className="center">Warbler.</h4>
          <h5 className="center">This is a Twitter Clone.</h5>
          <br />
          <button
            id="loginBtn"
            type="button"
            className="col s4 offset-s2 btn"
            onClick={this.handleClick}
            disabled={authType === "login" ? true : false}
          >
            <i className="material-icons left">vpn_key</i>Login
          </button>
          <button
            id="registerBtn"
            type="button"
            className="col s4 btn"
            onClick={this.handleClick}
            disabled={authType === "register" ? true : false}
          >
            <i className="material-icons left">person_add</i>Sign-Up
          </button>
          {authType === "register" && (
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

          {authType === "register" && (
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
        </div>
      </Form>
    );
  }
}

function mapStateToProps({ auth, view }) {
  return { auth, view };
}

const defaultFormVals = props => {
  return props.authType === "register"
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
  return props.authType === "register" ? signupSchema : loginSchema;
};

AuthForm = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: props => schema(props),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const res =
      props.authType === "register"
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
