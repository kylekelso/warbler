import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../store/actions";
import DefaultProfileImg from "../images/default-profile-image.jpg";
class PostItem extends Component {
  render() {
    return (
      <li className="collection-item avatar">
        <img
          src={this.props.imgUrl || DefaultProfileImg}
          alt={this.props.user}
          className="circle"
        />
        <span className="title">
          <Link to={`/${this.props.user}`}>{this.props.user} &nbsp;</Link>
        </span>
        <p>{this.props.text}</p>
        <Link to={`/${this.props.user}`} className="secondary-content">
          {this.props.isOwner && (
            <i
              className="material-icons red-text"
              onClick={() => this.props.deletePost(this.props.id)}
            >
              delete
            </i>
          )}
        </Link>
      </li>
    );
  }
}

export default connect(
  null,
  { deletePost }
)(PostItem);
