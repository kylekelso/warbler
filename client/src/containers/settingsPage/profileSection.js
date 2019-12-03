import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import { withFormik, Form, Field } from "formik";
import { profileSchema } from "../../utils/validationHelper";
import {
  renderInput,
  hasFieldsChanged,
  resolveErrors
} from "../../utils/fieldHelper";
import DefaultProfileImg from "../../images/default-profile-image.jpg";
import M from "materialize-css";

const profileSection = props => {
  const { profileImgUrl } = props.auth.user;
  return (
    <Form className="row">
      <Field
        className="input-field col s12"
        type="text"
        label="Username"
        name="username"
        component={renderInput}
      />
      <Field
        className="input-field col s12 m7"
        type="url"
        label="Image URL"
        name="profileImgUrl"
        component={renderInput}
      />
      <div className="col s8 offset-s2 m5 center-align">
        <img
          id="settingsImage"
          src={profileImgUrl || DefaultProfileImg}
          alt=""
          className="responsive-img circle"
        />
      </div>
      <Field
        className="input-field col s12"
        label="Description"
        name="description"
        component={renderInput}
      />
      <button
        className="waves-effect waves-green light-blue darken-2 btn col right"
        type="submit"
        name="action"
      >
        Save <i className="material-icons right">send</i>
      </button>
    </Form>
  );
};

const defaultFormVals = props => {
  let { username, profileImgUrl, description } = props.auth.user;
  return {
    updateType: "profile",
    username,
    profileImgUrl,
    description
  };
};

const profileFormik = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: profileSchema,
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    if (hasFieldsChanged(values, props.auth.user)) {
      const res = await props.updateUser(props.auth.user.username, values);
      if (res && res.status !== 200) {
        resolveErrors(res.data.error.message, setErrors);
      } else {
        M.toast({ html: "Changes saved." });
      }
    } else {
      M.toast({ html: "No Changes made." });
    }

    setSubmitting(false);
  }
})(profileSection);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(profileFormik);
