import React, { Component } from "react";
import { connect } from "react-redux";
import PostItem from "./PostItem";

class PostTimeline extends Component {
  renderContent() {
    let { auth, post } = this.props;
    if (post.list.length !== 0) {
      return post.list.map((p, i) => {
        return (
          <PostItem
            key={i}
            id={p._id}
            date={p.createdAt}
            text={p.text}
            user={p.author.username}
            imgUrl={p.author.profileImgUrl}
            tags={p.tags.map(t => t.username)}
            isOwner={auth.user.username === p.author.username}
          />
        );
      });
    }

    return <li className="collection-item center-align">No Posts</li>;
  }

  render() {
    return (
      <div>
        <ul className="section collection">{this.renderContent()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, post }) {
  return { auth, post };
}

export default connect(mapStateToProps)(PostTimeline);
