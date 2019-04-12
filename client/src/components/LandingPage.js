import React, { Component } from "react";
import AuthForm from "../containers/AuthForm";

class Landing extends Component {
  render() {
    return (
      <h4 id="auth-card" className="truncate bg-card-user">
        <div className="row">
          <AuthForm history={this.props.history} />
        </div>
      </h4>
    );
  }
}

export default Landing;
