import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required field."),
  password: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password does not match.")
    .required("Required field."),
  profileImgUrl: Yup.string().url("Must be a valid URL.")
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required field."),
  password: Yup.string()
    .min(8, "Too short! Must be between 8 and 30 characters.")
    .max(30, "Too long! Must be between 8 and 30 characters.")
    .required("Required field.")
});
