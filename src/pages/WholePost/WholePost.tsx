import { useParams, Link } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

import { Post } from "../../components/Post/Post";

import { useWholePostData } from "../../reactQueryHooks/useWholePostData";

import styles from "./WholePost.module.scss";

export const WholePost = () => {
  const { id } = useParams();

  const { isLoading, data } = useWholePostData(id);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Skeleton
          sx={{
            bgcolor: "#fafaf9",
          }}
          animation="wave"
          variant="rounded"
          height={256}
        />
      ) : (
        <>
          <Link to="/">
            <Button variant="contained" startIcon={<WestIcon />}>
              go back
            </Button>
          </Link>
          <Post {...data} />
        </>
      )}
    </div>
  );
};
