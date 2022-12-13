import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Stack } from "@mui/system";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";

import { scrollToTop } from "../../common/utils";

import { Post } from "../";

import { useAllPostsData } from "../../hooks/useAllPostsData";

import UserContext from "../../context/UserContext";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  const { isLoading, data } = useAllPostsData();

  const [isUserPosts, setIsUserPosts] = React.useState(false);
  const [scrollToTopVisible, setScrollToTopVisible] = React.useState(false);

  const renderPosts = () => {
    if (isUserPosts) {
      return data?.map((item: any, index: number) => {
        if (item.userEmail === user?.email) {
          return <Post key={index} {...item} />;
        }
      });
    }

    return data?.map((item: any, index: number) => (
      <Post key={index} {...item} />
    ));
  };

  window.addEventListener("scroll", () => {
    const scrolled = document.documentElement.scrollTop;

    const max = 200;

    if (scrolled > max) {
      setScrollToTopVisible(true);
    } else if (scrolled <= max) {
      setScrollToTopVisible(false);
    }
  });

  return (
    <div className={styles.home}>
      <h1>{user ? `Hello ${user.email}!` : "Home page"}</h1>
      {window.localStorage.getItem("jwt-token") ? (
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
      {scrollToTopVisible && (
        <div onClick={scrollToTop} className={styles.scroll}>
          <span>scroll to top</span>
          <NorthOutlinedIcon className={styles.arrow} fontSize="small" />
        </div>
      )}
    </div>
  );
};
