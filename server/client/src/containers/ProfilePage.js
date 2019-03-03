import React, { Component } from "react";
import { connect } from "react-redux";
import { setView, getPosts } from "../store/actions";
import requireAuth from "../hocs/requireAuth";
import UserAside from "../components/UserAside";
import PostTimeline from "./../components/PostTimeline";
import AddPostForm from "./../components/AddPostForm";

class ProfilePage extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchData();
    }
  }

  async fetchData() {
    await this.props.setView(this.props.match.params.username);
    await this.props.getPosts(this.props.view.id);
  }

  renderPostForm() {
    if (this.props.auth.user.username === this.props.view.username) {
      return <AddPostForm />;
    }
  }

  renderPreLoader() {
    return (
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.props.preloading) {
      return this.renderPreLoader();
    }
    let content = [];
    content.push(
      <div key="1" className="col s8 offset-s2 m3">
        <UserAside />
      </div>,
      <div key="2" className="col s12 m8">
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
  { setView, getPosts }
)(requireAuth(ProfilePage));
