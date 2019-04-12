import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import { withFormik, Form, Field } from "formik";
import { privacySchema } from "../../utils/validationHelper";
import { hasFieldsChanged, resolveErrors } from "../../utils/fieldHelper";
import M from "materialize-css";

const privacySection = props => {
  return (
    <Form className="row">
      <div className="col s12">
        <div className="left">Private Profile</div>
        <div className="switch right">
          <label>
            Off
            <Field
              name="privateProfile"
              type="checkbox"
              component="input"
              checked={props.values.privateProfile}
            />
            <span className="lever" />
            On
          </label>
        </div>
      </div>
      <div className="col s12">
        <p>Other users cannot see your profile.</p>
      </div>
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
  let { privateProfile } = props.auth.user;
  return {
    updateType: "privacy",
    privateProfile
  };
};

const privacyFormik = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: privacySchema,
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
})(privacySection);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(privacyFormik);
