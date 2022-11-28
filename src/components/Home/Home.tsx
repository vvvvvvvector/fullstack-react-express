import React, { useContext } from "react";

import axios from "axios";

import { Button } from "@mui/material";

import { Post } from "../Post/Post";

import { UserContext } from "../../context/UserContext";

import { FetchPostType } from "../../common/types";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = React.useState<FetchPostType[]>([]);

  React.useEffect(() => {
    const fetchAllPosts = async () => {
      await axios
        .get("http://localhost:4500/posts")
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchAllPosts();
  }, []);

  return (
    <div className={styles.home}>
      <h1>{user ? `Hello ${user.email}` : "Home page!"}</h1>
      {user ? (
        <div className={styles["after-header"]}>
          <span>Signed in successfully!</span>
          <Button variant="contained">Add a new post</Button>
        </div>
      ) : (
        <span>Sign in to see information about yourself!</span>
      )}
      {posts.map((item, index) => (
        <Post
          key={index}
          id={item._id}
          userEmail={item.user.email}
          createdAt={item.createdAt}
          title={item.title}
          text={item.text}
          tags={item.tags}
          views={item.viewsCount}
        />
      ))}
    </div>
  );
};
