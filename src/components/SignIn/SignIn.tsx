import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Formik, Form, useField, FieldAttributes } from "formik";

import * as yup from "yup";

import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

import styles from "./SignIn.module.scss";

import { UserContext } from "../../context/UserContext";

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

type MyTextFieldType = { type: string; label: string } & FieldAttributes<{}>;

const MyTextField: React.FC<MyTextFieldType> = ({ type, label, ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  // {...field} -> name, onChange, onBlur properites
  return (
    <TextField
      sx={{
        position: "relative",
        width: "100%",
        marginBottom: "20px",
      }}
      {...field}
      type={type}
      label={label}
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{ email: "", password: "", isCool: false }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);

          await axios
            .post("http://localhost:4500/auth/signin", {
              email: data.email,
              password: data.password,
            })
            .then((res) => {
              const { user, token } = res.data;

              setUser({ info: user, token });

              navigate("/");

              console.log(JSON.stringify(res.data, null, 2));
            })
            .catch((err) => {
              console.log(JSON.stringify(err.response.data, null, 2));
            });

          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <h2 className={styles.header}>Sign in</h2>
            <MyTextField name="email" type="text" label="Your email" />
            <MyTextField
              name="password"
              type="password"
              label="Your password"
            />
            <FormControlLabel
              name="isCool"
              control={<Checkbox checked={values.isCool} />}
              label="Do you agree that Formik is cool?"
              onChange={handleChange}
            />
            <Button
              sx={{
                position: "relative",
                width: "100%",
                marginTop: "20px",
              }}
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              size="large"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};
