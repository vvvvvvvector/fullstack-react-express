import React, { useContext } from "react";

import axios from "axios";

import { Button } from "@mui/material";

import { Post } from "../Post/Post";

import { UserContext } from "../../context/UserContext";

import { PostType } from "../../common/types";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = React.useState<PostType[]>([]);

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
            });

            setPosts(result);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchAllPosts();
  }, []);

  return (
    <div className={styles.home}>
      <h1>{user ? `Hello ${user.email}!` : "Home page"}</h1>
      {user ? (
        <div className={styles["after-header"]}>
          <span>Signed in successfully!</span>
          <Button
            onClick={() => console.log("hello world!")}
            variant="contained"
          >
            Add a new post
          </Button>
        </div>
      ) : (
        <span>
          {
            "Sign in if you want to create/delete/update[not now -> mb in future] posts!"
          }
        </span>
      )}
      {posts.map((item, index) => (
        <Post key={index} {...item} />
      ))}
    </div>
  );
};
