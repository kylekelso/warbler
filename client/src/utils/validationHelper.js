import * as Yup from "yup";

const _username = () => {
  return Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field.");
};

const _email = () => {
  return Yup.string()
    .email("Invalid email address.")
    .required("Required field.");
};

const _password = () => {
  return Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field.");
};

export const signupSchema = Yup.object().shape({
  username: _username(),
  email: _email(),
  password: _password(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match.")
    .required("Required field."),
  profileImgUrl: Yup.string().url("Must be a valid URL.")
});

export const loginSchema = Yup.object().shape({
  email: _email(),
  password: _password()
});

export const settingsSchema = Yup.object().shape({
  username: _username(),
  oldPassword: _password(),
  newPassword: _password(),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Password does not match.")
    .required("Required field."),
  profileImgUrl: Yup.string().url("Must be a valid URL.")
});
