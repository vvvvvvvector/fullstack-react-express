import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { axiosInstanse } from "../../../axiosInstance";

import { setUserToken } from "../../../common/utils";

import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { Email } from "../Common/Email";
import { Password } from "./Password";

import { Formik, Form } from "formik";

import { SignInValidation } from "../Common/validations";

import useUserContext from "../../../context/hooks/useUserContext";

import styles from "./SignIn.module.scss";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{ email: "", password: "", isCool: false }}
        validationSchema={SignInValidation}
        onSubmit={async (data, { setSubmitting }) => {
          try {
            setSubmitting(true);

            const { data: axiosResponse } = await axiosInstanse.post(
              "/auth/signin",
              {
                email: data.email,
                password: data.password,
              }
            );

            const { user, token } = axiosResponse;

            setUser(user);
            setUserToken(token);

            navigate("/");

            toast.success("Signed in successfully:>");

            setSubmitting(false);
          } catch (error) {
            toast.error("Incorrect username or password.");
            console.log(JSON.stringify(error.response.data, null, 2));
          }
        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <h2 className={styles.header}>Sign in</h2>
            <Email name="email" />
            <Password name="password" />
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
                height: "42px",
                marginTop: "20px",
              }}
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              size="large"
            >
              {isSubmitting ? "Loading..." : "Continue"}
            </Button>
            <div className={styles.bottom}>
              <span>Don't have an account?</span>
              <Link to="/signup">
                <p>Sign up</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
