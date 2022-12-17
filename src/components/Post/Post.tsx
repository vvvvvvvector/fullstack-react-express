import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { formatDate } from "../../common/utils";

import { AwesomePost } from "../../common/types";

import { useDeletePost } from "../../reactQueryHooks/useDeletePost";

import useUserContext from "../../context/hooks/useUserContext";

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
  const { user } = useUserContext();

  const { mutate } = useDeletePost();

  return (
    <Link to={`/post/${id}`}>
      <div className={styles["post-wrapper"]}>
        <b>{userEmail}</b>
        <p className={styles["created-at"]}>{`Created: ${formatDate(
          createdAt
        )}`}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <ul>
          {tags && tags.length > 0
            ? tags?.map((item, index) => <li key={index}>{`#${item}`}</li>)
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
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              event.nativeEvent.stopImmediatePropagation();
              mutate({ id });
            }}
            endIcon={<DeleteIcon color="error" />}
            color="error"
            variant="outlined"
          >
            delete
          </Button>
        )}
      </div>
    </Link>
  );
};

export default Post;
