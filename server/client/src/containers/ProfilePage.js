import React, { Component } from "react";
import { connect } from "react-redux";

import requireAuth from "../hocs/requireAuth";

class ProfilePage extends Component {
  render() {
    return (
      <div className="row">
        <div>Profile Page</div>
      </div>
    );
  }
}

export default connect()(requireAuth(ProfilePage));
