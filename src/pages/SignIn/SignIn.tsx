import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";

import { setUserToken } from "../../common/utils";

import { Button, FormControlLabel, Checkbox } from "@mui/material";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

import { Formik, Form } from "formik";

import validationSchema from "./validations";

import UserContext from "../../context/UserContext";

import styles from "./SignIn.module.scss";

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

              navigate("/");

              toast.success("Signed in successfully:>");
              console.log(JSON.stringify(res.data, null, 2));
            })
            .catch((err) => {
              toast.error("Incorrect username or password.");
              console.log(JSON.stringify(err.response.data, null, 2));
            });

          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <h2 className={styles.header}>Sign in</h2>
            <EmailField name="email" />
            <PasswordField name="password" />
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
