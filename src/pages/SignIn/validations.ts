import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is a required field!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "It isn't an email address!"),
  password: yup
    .string()
    .required("You must have a password!")
    .min(5, "Weak password!"),
});

export default validationSchema;
