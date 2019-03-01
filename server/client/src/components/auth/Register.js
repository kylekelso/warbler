import React, { Component } from "react";
import { connect } from "react-redux";
import AuthForm from "./AuthForm";
import { registerUser } from "../../store/actions";

class Register extends Component {
  onSubmit = async formVals => {
    await this.props.registerUser(formVals);

    if (this.props.auth.isAuthenticated) {
      //await this.props.fetchMessages();
      this.props.history.push(`/${this.props.auth.user.username}`);
    }
  };

  render() {
    return (
      <div className="row">
        <h3 className="col s8 offset-s2">Join Warbler!</h3>
        <AuthForm onSubmit={this.onSubmit} authType="Register" />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
