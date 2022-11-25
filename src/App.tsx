import React from "react";

import { Formik, Form } from "formik";

import { TextField, Button } from "@mui/material";

import "./scss/_app.scss";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          // make async call for instance

          setTimeout(() => {
            console.log("submit: ", data);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <TextField
              className="input"
              name="email"
              type="email"
              label="Your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              className="input"
              name="password"
              type="password"
              label="Your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
