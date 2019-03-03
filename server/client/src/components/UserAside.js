import React, { Component } from "react";
import { connect } from "react-redux";
import defaultProfileImg from "../images/default-profile-image.jpg";

class UserAside extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <img
            src={this.props.view.profileImgUrl || defaultProfileImg}
            alt=""
          />
        </div>
        <div className="card-content">
          <span className="card-title">@{this.props.view.username}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ view }) {
  return { view };
}

export default connect(mapStateToProps)(UserAside);
