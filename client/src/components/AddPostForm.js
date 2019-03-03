import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { addPost, validateTag } from "../store/actions";
import M from "materialize-css";

class AddPostForm extends Component {
  TAG_AREA_REF = null;

  componentDidMount() {
    this.TAG_AREA_REF = document.querySelector(".chips");
    M.Chips.init(this.TAG_AREA_REF, {
      placeholder: "Tag a user.",
      secondaryPlaceholder: "+User",
      onChipAdd: () => this.chipValidator()
    });
  }

  chipValidator = async () => {
    let ele = M.Chips.getInstance(this.TAG_AREA_REF);
    await this.props.validateTag(ele.chipsData[ele.chipsData.length - 1].tag);
    if (!this.props.post.isValidTag) {
      ele.deleteChip(ele.chipsData.length - 1);
    }
  };

  renderTextArea = ({ input, meta }) => {
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
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <span className="helper-text" data-error={error} data-success="Good!" />
      );
    }
  }

  onSubmit = async formVals => {
    let instance = M.Chips.getInstance(this.TAG_AREA_REF);
    formVals.tags = instance.chipsData.map(a => a.tag);
    this.props.addPost(formVals);
    return instance;
  };

  render() {
    return (
      <form
        className="section col s12"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="input-field col s12">
          <div className="chips" />
        </div>
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

const validate = formVals => {
  const errors = {};
  if (!formVals.text) {
    errors.text = "Required field.";
  } else if (formVals.text.length > 160) {
    errors.text = "Must be between at least 160 characters.";
  }
  return errors;
};

const afterSubmit = (result, dispatch) => {
  result.chipsData = [];
  dispatch(reset("newPost"));
};

function mapStateToProps({ post }) {
  return { post };
}

AddPostForm = connect(
  mapStateToProps,
  { addPost, validateTag }
)(AddPostForm);

export default reduxForm({
  form: "newPost",
  onSubmitSuccess: afterSubmit,
  validate
})(AddPostForm);
