import React, { useContext } from "react";

import axios from "axios";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { formatDate } from "../../common/utils";
import { PostType } from "../../common/types";

import styles from "./Post.module.scss";

import UserContext from "../../context/UserContext";
import { toast } from "react-hot-toast";

const Post: React.FC<PostType> = ({
  id,
  userEmail,
  createdAt,
  title,
  text,
  tags,
  views,
}) => {
  const { user } = useContext(UserContext);

  const handleOnPostClick = () => {
    axios
      .get(`http://localhost:4500/posts/${id}`)
      .then(() => {
        toast.success(`you have opened the post: ${id}`, {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div onClick={handleOnPostClick} className={styles["post-wrapper"]}>
      <b>{userEmail}</b>
      <p className={styles["created-at"]}>{`Created: ${formatDate(
        createdAt
      )}`}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <ul>
        {tags.length > 0
          ? tags.map((item, index) => <li key={index}>{`#${item}`}</li>)
          : "no tags :("}
      </ul>
      <div className={styles.views}>
        <VisibilityOutlinedIcon sx={{ color: "grey" }} />
        <span>{`${views}`}</span>
      </div>
      {userEmail === user?.email && (
        <Button
          sx={{
            position: "absolute",
            top: "30px",
            right: "30px",
          }}
          endIcon={<DeleteIcon color="error" />}
          color="error"
          variant="outlined"
        >
          delete
        </Button>
      )}
    </div>
  );
};

export default Post;
