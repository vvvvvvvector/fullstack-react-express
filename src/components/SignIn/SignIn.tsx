import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";

import { Button, FormControlLabel, Checkbox } from "@mui/material";

import { Formik, Form } from "formik";

import MyTextField from "./MyTextField";

import validationSchema from "./validations";

import UserContext from "../../context/UserContext";

import styles from "./SignIn.module.scss";
import { setUserToken } from "../../common/utils";

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

              setUser(user);
              setUserToken(token);

              toast.success("Signed in successfully!");

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
          </Form>
        )}
      </Formik>
    </div>
  );
};
