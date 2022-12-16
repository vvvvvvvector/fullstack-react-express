import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Button } from "@mui/material";
import { Email } from "../Common/Email";
import { Password } from "./Password";

import { Formik, Form } from "formik";

import { SignUpValidation } from "../Common/validations";

import { useCreateUser } from "../../../reactQueryHooks/useCreateUser";

import styles from "./SignUp.module.scss";

export const SignUp = () => {
  const { mutate } = useCreateUser();

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpValidation}
        onSubmit={(data, { setSubmitting }) => {
          if (data.password === data.confirmPassword) {
            setSubmitting(true);

            mutate({ email: data.email, password: data.password });

            setSubmitting(false);
          } else {
            setSubmitting(false);

            toast.error("Passwords do not match!");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className={styles.header}>Sign up</h2>
            <Email name="email" />
            <Password name="password" label="Enter password" />
            <Password name="confirmPassword" label="Confirm password" />
            <Button
              sx={{
                position: "relative",
                width: "100%",
                height: "42px",
              }}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading..." : "create an account"}
            </Button>
            <div className={styles.bottom}>
              <span>Already have an account?</span>
              <Link to="/signin">
                <p>Sign in</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
