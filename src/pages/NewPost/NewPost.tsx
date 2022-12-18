import React from "react";
import { toast } from "react-hot-toast";

import { TextField, Button, Chip } from "@mui/material";

import { Formik, Form } from "formik";

import { useAddNewPost } from "../../react-query/hooks/useAddNewPost";

import styles from "./NewPost.module.scss";

export const NewPost: React.FC = () => {
  const { mutateAsync } = useAddNewPost();

  const [tagsInput, setTagsInput] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const handleDeleteTag = (tagIndex: number) => () => {
    setTags((prev) => prev.filter((_, index) => index !== tagIndex));
  };

  return (
    <div className={styles["form-wrapper"]}>
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        onSubmit={async (data, { setSubmitting }) => {
          if (data.text !== "" && data.title !== "") {
            try {
              setSubmitting(true);

              await mutateAsync({
                title: data.title,
                text: data.text,
                tags,
              });

              setSubmitting(false);
            } catch (error) {
              console.log(error);
            }
          } else {
            toast.error("You must add title and text!");
          }
        }}
      >
        {({ handleChange, isSubmitting }) => (
          <Form>
            <h2 className={styles.header}>New post</h2>
            <TextField
              name="title"
              sx={{
                position: "relative",
                width: "100%",
                marginBottom: "20px",
              }}
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
                    label={tag}
                    onDelete={handleDeleteTag(index)}
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
                variant="outlined"
              />
              <Button
                onClick={() => {
                  if (tagsInput !== "") {
                    setTags((prev) => [...prev, tagsInput]);
                    setTagsInput("");
                  } else {
                    toast.error("You must specify tag value!");
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "creating..." : "create"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
