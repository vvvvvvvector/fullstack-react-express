import React from "react";

import { Formik, Form, useField, FieldAttributes } from "formik";

import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

import "./scss/_app.scss";

type MyTextFieldType = { type: string; label: string } & FieldAttributes<{}>;

const MyTextField: React.FC<MyTextFieldType> = ({ type, label, ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  // {...field} -> name, onChange, onBlur properites
  return (
    <TextField
      className="input"
      {...field}
      type={type}
      label={label}
      helperText={errorText}
      error={errorText !== ""}
    />
  );
};

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Formik
        initialValues={{ email: "", password: "", isCool: false }}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.email = "Invalid email!";
          }

          if (values.password.length < 5) {
            errors.password = "Weak password!";
          }

          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          // make async call for instance

          setTimeout(() => {
            console.log("submit: ", data);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, errors, isSubmitting, handleChange }) => (
          <Form>
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
              className="submit"
              type="submit"
              disabled={isSubmitting}
              variant="outlined"
            >
              Submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
