import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { TextField, Button } from "@mui/material";

import { Formik, Form } from "formik";

import styles from "./NewPost.module.scss";

export const NewPost: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{ title: "", text: "", tags: [] }}
        onSubmit={(data) => {
          if (data.text !== "" && data.title !== "") {
            axios
              .post(
                "http://localhost:4500/posts",
                {
                  title: data.title,
                  text: data.text,
                  tags: data.tags,
                },
                {
                  headers: {
                    Authorization:
                      "Bearer " + window.localStorage.getItem("jwt-token"),
                  },
                }
              )
              .then(() => {
                navigate("/");
              });
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <h2 className={styles.header}>New post</h2>
            <TextField
              name="title"
              sx={{ position: "relative", width: "100%", marginBottom: "20px" }}
              label="Title"
              type="text"
              onChange={handleChange}
            />
            <TextField
              name="text"
              sx={{
                position: "relative",
                width: "100%",
                marginBottom: "20px",
              }}
              rows={5}
              type="text"
              onChange={handleChange}
              label="Text"
              multiline
            />
            <Button
              sx={{
                position: "relative",
                width: "100%",
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
