import React, { Component } from "react";
import { connect } from "react-redux";

class PostTimeline extends Component {
  renderContent() {
    let { auth } = this.props;
  }

  render() {
    return (
      <div>
        <ul className="collection">
          <div>PostTimeline</div>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PostTimeline);
