import React, { Component } from "react";
import { connect } from "react-redux";
import { setView } from "../store/actions";
import requireAuth from "../hocs/requireAuth";
import UserAside from "../components/UserAside";

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.setView(this.props.match.params.username);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      await this.props.setView(this.props.match.params.username);
    }
  }

  renderContent() {
    return <UserAside />;
  }

  render() {
    return (
      <div className="row">
        <br />
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(
  null,
  { setView }
)(requireAuth(ProfilePage));
