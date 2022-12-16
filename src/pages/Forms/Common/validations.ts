import * as yup from "yup";

export const SignInValidation = yup.object({
  email: yup
    .string()
    .required("Email is a required field!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "It isn't an email address!"),
  password: yup
    .string()
    .required("You must have a password!")
    .min(5, "Weak password!"),
});

export const SignUpValidation = yup.object({
  email: yup
    .string()
    .required("Email is a required field!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "It isn't an email address!"),
  password: yup
    .string()
    .required("You must have a password!")
    .min(5, "Weak password!"),
  confirmPassword: yup.string().required("You must confirm a password!"),
});
