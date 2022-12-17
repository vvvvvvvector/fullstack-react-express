import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Stack } from "@mui/system";
import Pagination from "@mui/material/Pagination";

import { getUserToken } from "../../common/utils";

import { Post, ScrollButton } from "../../components";

import { useAllPostsData } from "../../reactQueryHooks/useAllPostsData";

import useUserContext from "../../context/hooks/useUserContext";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { user } = useUserContext();

  const { isLoading, data } = useAllPostsData();

  const [isUserPosts, setIsUserPosts] = React.useState(false);

  const renderPosts = () => {
    if (isUserPosts) {
      return data?.map((item, index) => {
        if (item.userEmail === user?.email)
          return <Post key={index} {...item} />;
      });
    }

    return data?.map((item, index) => <Post key={index} {...item} />);
  };

  return (
    <div className={styles.home}>
      <h1>{user ? `Signed in as ${user.email}!` : "Home page"}</h1>
      {getUserToken() ? (
        <div className={styles["after-header"]}>
          <span>You are welcome!</span>
          <Stack direction={"row"} gap={2}>
            <FormControlLabel
              control={<Switch onChange={() => setIsUserPosts(!isUserPosts)} />}
              label={isUserPosts ? "Show all posts" : "Show my posts"}
            />
            <Link to="/newpost">
              <Button variant="contained">Add a new post</Button>
            </Link>
          </Stack>
        </div>
      ) : (
        <span>{"Sign in if you want to create your posts!"}</span>
      )}
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        renderPosts()
      )}
      {!isLoading && (
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      )}
      <ScrollButton />
    </div>
  );
};
