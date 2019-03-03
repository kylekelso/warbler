import React, { Component } from "react";
import { connect } from "react-redux";
import AuthForm from "./AuthForm";
import { loginUser } from "../../store/actions";

class Login extends Component {
  onSubmit = async formVals => {
    await this.props.loginUser(formVals);

    if (this.props.auth.isAuthenticated) {
      //await this.props.fetchMessages();
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  };

  render() {
    return (
      <div className="row">
        <h3 className="col s8 offset-s2">Login</h3>
        <AuthForm onSubmit={this.onSubmit} authType="Login" />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
