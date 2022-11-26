import { Formik, Form, useField, FieldAttributes } from "formik";

import * as yup from "yup";

import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

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

const validationSchema = yup.object({
  email: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "It isn't an email address!"),
  password: yup
    .string()
    .required("You must have a password!")
    .min(5, "Weak password!"),
});

export const SignIn: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "", isCool: false }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);

        // make async call for instance

        setTimeout(() => {
          console.log("submit: ", data);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ values, isSubmitting, handleChange }) => (
        <Form>
          <MyTextField name="email" type="text" label="Your email" />
          <MyTextField name="password" type="password" label="Your password" />
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
            variant="outlined"
          >
            Submit
          </Button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};
