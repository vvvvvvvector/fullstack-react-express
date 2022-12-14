import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { Post } from "../Post/Post";

import { useWholePostData } from "../../reactQueryHooks/useWholePostData";

import styles from "./WholePost.module.scss";

export const WholePost = () => {
  const { id } = useParams();

  const { isLoading, data } = useWholePostData(id);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Post {...data} />
      )}
    </div>
  );
};
