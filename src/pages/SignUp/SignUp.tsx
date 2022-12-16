import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import { Formik, Form } from "formik";

import styles from "./SignUp.module.scss";

export const SignUp = () => {
  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {({ values }) => (
          <Form>
            <h2 className={styles.header}>Sign up</h2>
            <Button
              sx={{
                position: "relative",
                width: "100%",
                marginTop: "20px",
              }}
              variant="contained"
              type="submit"
            >
              create account
            </Button>
            <div className={styles.bottom}>
              <span>Already have an account?</span>
              <Link to="/signin">
                <p>Sign in</p>
              </Link>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};
