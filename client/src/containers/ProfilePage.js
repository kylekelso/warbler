import React, { Component } from "react";
import { connect } from "react-redux";
import { setView, getPosts, resetLoader } from "../store/actions";
import UserAside from "./UserAside";
import PostTimeline from "./PostTimeline";
import AddPostForm from "./AddPostForm";
import Navbar from "./Navbar";
import Spinner from "../components/spinner";
import NotFound from "../components/notFound";

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
    await this.props.resetLoader();
    await this.props.setView(this.props.match.params.username).then(() => {
      if (this.props.view.userExists) {
        this.props.getPosts(this.props.view.id);
      }
    });
  }

  renderPostForm() {
    if (this.props.auth.user.username === this.props.view.username) {
      return <AddPostForm />;
    }
  }

  renderContent() {
    if (this.props.view.userExists === false) {
      return <NotFound />;
    }

    if (this.props.post.loaded === false) {
      return <Spinner />;
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
        <Navbar />
        <div className="row">
          <br />
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, view, post }) {
  return { auth, view, post };
}

export default connect(
  mapStateToProps,
  { setView, getPosts, resetLoader }
)(ProfilePage);
