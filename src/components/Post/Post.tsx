import React, { useContext } from "react";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { formatDate } from "../../common/utils";

import { AwesomePost } from "../../common/types";

import { useDeletePost } from "../../reactQueryHooks/useDeletePost";

import UserContext from "../../context/UserContext";

import styles from "./Post.module.scss";

export const Post: React.FC<AwesomePost> = ({
  id,
  userEmail,
  createdAt,
  title,
  text,
  tags,
  views,
}) => {
  const { user } = useContext(UserContext);

  const { mutate } = useDeletePost();

  return (
    <div className={styles["post-wrapper"]}>
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
          onClick={() => mutate({ id })}
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
