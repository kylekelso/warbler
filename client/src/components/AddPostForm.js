import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { renderInput } from "./../utils/fieldHelper";
import { addPost } from "../store/actions";
import TagInput from "./TagInput";

class AddPostForm extends Component {
  render() {
    return (
      <Form className="section col s12">
        <TagInput
          name="tags"
          value={this.props.values.tags}
          onChange={this.props.setFieldValue}
          onBlur={this.props.setFieldTouched}
        />
        <Field name="text" component={renderInput} />
        <div className="input-field col s2 center-align">
          <button
            className="btn-floating waves-effect waves-light"
            type="submit"
            name="action"
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </Form>
    );
  }
}

const defaultFormVals = {
  tags: [],
  text: ""
};

AddPostForm = withFormik({
  mapPropsToValues: () => defaultFormVals,
  handleSubmit: (values, { resetForm, props }) => {
    props.addPost(values);
    resetForm();
  }
})(AddPostForm);

export default connect(
  null,
  { addPost }
)(AddPostForm);
