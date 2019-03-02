import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addPost } from "../store/actions";

class AddPostForm extends Component {
  renderTextArea = ({ input }) => {
    return (
      <div className="input-field col s10">
        <textarea
          {...input}
          id="post_textarea"
          data-length="160"
          className="materialize-textarea validate"
          required
        />
        <label htmlFor="post_textarea">Post a Warble!</label>
      </div>
    );
  };

  onSubmit = async formVals => {
    this.props.addPost(formVals);
  };

  render() {
    return (
      <form
        className="section col s12"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="text" component={this.renderTextArea} />
        <div className="input-field col s2 center-align">
          <button
            className="btn-floating waves-effect waves-light"
            type="submit"
            name="action"
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </form>
    );
  }
}

AddPostForm = connect(
  null,
  { addPost }
)(AddPostForm);

export default reduxForm({
  form: "newPost"
})(AddPostForm);
