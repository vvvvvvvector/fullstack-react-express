import React from "react";
import { toast } from "react-hot-toast";

import { TextField, Button, Chip } from "@mui/material";

import { Formik, Form } from "formik";

import { useAddNewPost } from "../../hooks/useAddNewPost";

import { TagType } from "../../common/types";

import styles from "./NewPost.module.scss";

export const NewPost: React.FC = () => {
  const { mutate } = useAddNewPost();

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
          const _tags = tags.map((i) => i.value);

          if (data.text !== "" && data.title !== "") {
            mutate({
              title: data.title,
              text: data.text,
              tags: _tags,
            });
          } else {
            toast.error("You must add title and text!");
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
