import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { scrollToTop } from "../../common/utils";

import { Button, CircularProgress } from "@mui/material";

import Post from "../Post/Post";

import UserContext from "../../context/UserContext";

import { PostType } from "../../common/types";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState<PostType[]>([]);

  const [scrollToTopVisible, setScrollToTopVisible] = React.useState(false);

  window.addEventListener("scroll", () => {
    const scrolled = document.documentElement.scrollTop;

    const max = 200;

    if (scrolled > max) {
      setScrollToTopVisible(true);
    } else if (scrolled <= max) {
      setScrollToTopVisible(false);
    }
  });

  React.useEffect(() => {
    const fetchAllPosts = () => {
      axios
        .get("http://localhost:4500/posts")
        .then((res) => {
          const result: PostType[] = [];

          for (let i = 0; i < res.data.posts.length; i++) {
            result.push({
              id: res.data.posts[i]._id,
              userEmail: res.data.posts[i].user.email,
              createdAt: res.data.posts[i].createdAt,
              title: res.data.posts[i].title,
              text: res.data.posts[i].text,
              tags: res.data.posts[i].tags,
              views: res.data.posts[i].viewsCount,
              onRemovePost: handleRemovePost,
            });

            setPosts(result);

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchAllPosts();
  }, []);

  const handleRemovePost = (postToRemoveId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postToRemoveId));
  };

  return (
    <div className={styles.home}>
      <h1>{user ? `Hello ${user.email}!` : "Home page"}</h1>
      {window.localStorage.getItem("jwt-token") ? (
        <div className={styles["after-header"]}>
          <span>Signed in successfully!</span>
          <Link to="/newpost">
            <Button variant="contained">Add a new post</Button>
          </Link>
        </div>
      ) : (
        <span>{"Sign in if you want to create your posts!"}</span>
      )}
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        posts.map((item, index) => <Post key={index} {...item} />)
      )}
      {scrollToTopVisible && (
        <div onClick={scrollToTop} className={styles.scroll}>
          scroll up
        </div>
      )}
    </div>
  );
};

export default Home;
