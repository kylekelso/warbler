import React, { Component } from "react";
import { connect } from "react-redux";
import { searchUsers } from "../store/actions";
import Select from "react-select";
import "./TagInput.css";

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
    return this.props.view.searchResults.map(user => {
      return { value: user, label: user };
    });
  }

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
