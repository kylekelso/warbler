import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import { withFormik, Form, Field } from "formik";
import { accPassSchema } from "../../utils/validationHelper";
import {
  renderInput,
  hasFieldsChanged,
  resolveErrors
} from "../../utils/fieldHelper";
import M from "materialize-css";

const accPassSection = props => {
  return (
    <Form className="row">
      <Field
        className="input-field col s12"
        type="password"
        label="Old Password"
        name="oldPassword"
        component={renderInput}
      />
      <Field
        className="input-field col s12"
        type="password"
        label="New Password"
        name="newPassword"
        component={renderInput}
      />
      <Field
        className="input-field col s12"
        type="password"
        label="Confirm New Password"
        name="confirmNewPassword"
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
  return {
    updateType: "accPassword",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  };
};

const accPassFormik = withFormik({
  mapPropsToValues: props => defaultFormVals(props),
  validationSchema: accPassSchema,
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
})(accPassSection);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(accPassFormik);
