import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  Pagination,
} from "@mui/material";
import { Stack } from "@mui/system";

import { getUserToken } from "../../common/utils";

import { Post, ScrollButton, NoPosts } from "../../components";

import { useAllPostsData } from "../../react-query/hooks/useAllPostsData";

import useUserContext from "../../context/hooks/useUserContext";

import styles from "./Home.module.scss";
import { AwesomePost } from "../../common/types";

export const Home: React.FC = () => {
  const { user } = useUserContext();

  const { isLoading, data } = useAllPostsData();

  const [isUserPosts, setIsUserPosts] = React.useState(false);

  const renderPosts = () => {
    if (isUserPosts) {
      const filteredData = data?.filter((item, index) => {
        if (item.userEmail === user?.email) {
          return item;
        }
      });

      return filteredData && filteredData?.length > 0 ? (
        filteredData?.map((item, index) => <Post key={index} {...item} />)
      ) : (
        <NoPosts />
      );
    }

    return data?.map((item, index) => <Post key={index} {...item} />);
  };

  return isLoading ? (
    <div className={styles.loading}>
      <CircularProgress size="5rem" />
    </div>
  ) : (
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
      {renderPosts()}
      {/* <Pagination count={10} variant="outlined" shape="rounded" size="large" /> */}
      <ScrollButton />
    </div>
  );
};
