import React, { Component } from "react";
import { connect } from "react-redux";
import { setView } from "../store/actions";
import requireAuth from "../hocs/requireAuth";
import UserAside from "../components/UserAside";
import PostTimeline from "./../components/PostTimeline";

class ProfilePage extends Component {
  async componentDidMount() {
    await this.props.setView(this.props.match.params.username);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      await this.props.setView(this.props.match.params.username);
    }
  }

  renderPostForm() {
    if (this.props.auth.user.username === this.props.view.username) {
      return <div>PostForm</div>;
    }
  }

  renderContent() {
    let { auth } = this.props;
    let content = [];
    if (!auth.isAuthenticated) {
      return <div>Page does not exist</div>;
    }
    content.push(
      <div key="1" className="col s3">
        <UserAside />
      </div>,
      <div key="2" className="col s6">
        {this.renderPostForm()}
        <PostTimeline />
      </div>
    );
    return content;
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

function mapStateToProps({ auth, view }) {
  return { auth, view };
}

export default connect(
  mapStateToProps,
  { setView }
)(requireAuth(ProfilePage));
