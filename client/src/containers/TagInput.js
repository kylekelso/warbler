import React, { Component } from "react";
import { connect } from "react-redux";
import { searchUsers } from "../store/actions";
import Select from "react-select";
import "./TagInput.css";
import defaultProfileImg from "../images/default-profile-image.jpg";

const Option = props => {
  return (
    <div
      className="tag__option"
      ref={props.innerRef}
      {...props.innerProps}
      style={props.getStyles("option", props)}
    >
      <img
        className="circle responsive-img"
        src={props.data.profileImgUrl || defaultProfileImg}
        alt=""
      />
      <span>{props.children}</span>
    </div>
  );
};

class TagInput extends Component {
  state = { isLoading: false };

  componentDidUpdate(prevProps) {
    if (prevProps.view.searchResults !== this.props.view.searchResults) {
      this.setState({ isLoading: false });
    }
  }

  handleChange = value => {
    this.props.onChange(
      "tags",
      value.map(tag => {
        return tag.label;
      })
    );
  };
  handleInputChange = inputValue => {
    this.asyncOptions(inputValue);
  };

  asyncOptions = async inputValue => {
    if (!inputValue) {
      return;
    }
    this.setState({ isLoading: true });
    await this.props.searchUsers(inputValue);
  };

  mapResults() {
    return this.props.view.searchResults.map(({ username, profileImgUrl }) => {
      return { value: username, label: username, profileImgUrl };
    });
  }

  renderValueComponent() {}

  render() {
    return (
      <Select
        isMulti
        isLoading={this.state.isLoading}
        options={this.mapResults()}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        noOptionsMessage={() => "No results."}
        loadingMessage={() => "Searching..."}
        placeholder="Tag a user..."
        className="tag-container input-field col s12"
        classNamePrefix="tag"
        components={{
          Option
        }}
      />
    );
  }
}

function mapStateToProps({ view }) {
  return { view };
}

export default connect(
  mapStateToProps,
  { searchUsers }
)(TagInput);
