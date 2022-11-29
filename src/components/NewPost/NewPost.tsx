import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { TextField, Button, Chip } from "@mui/material";

import { Formik, Form } from "formik";

import styles from "./NewPost.module.scss";

interface TagType {
  key: number;
  value: string;
}

export const NewPost: React.FC = () => {
  const navigate = useNavigate();

  const [tagsInput, setTagsInput] = React.useState("");
  const [tags, setTags] = React.useState<TagType[]>([]);

  const handleDeleteTag = (tagToDelete: TagType) => () => {
    setTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
  };

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        onSubmit={(data) => {
          const resTags = [];

          for (let i = 0; i < tags.length; i++) {
            resTags.push(tags[i].value);
          }

          if (data.text !== "" && data.title !== "") {
            axios
              .post(
                "http://localhost:4500/posts",
                {
                  title: data.title,
                  text: data.text,
                  tags: resTags,
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
            {tags.length > 0 && (
              <div className={styles.stack}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={tag.value}
                    onDelete={handleDeleteTag(tag)}
                  />
                ))}
              </div>
            )}
            <div className={styles["tags-input"]}>
              <TextField
                sx={{
                  width: "70%",
                }}
                onChange={(e) => {
                  setTagsInput(e.target.value);
                }}
                value={tagsInput}
                label="Tag"
                variant="filled"
              />
              <Button
                onClick={() => {
                  if (tagsInput !== "") {
                    setTags((prev) => [
                      ...prev,
                      { key: tags.length, value: tagsInput },
                    ]);
                    setTagsInput("");
                  }
                }}
                variant="outlined"
              >
                Add tag
              </Button>
            </div>
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
