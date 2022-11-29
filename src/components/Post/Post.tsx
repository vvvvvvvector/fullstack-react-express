import React from "react";

import axios from "axios";

import { formatDate } from "../../common/utils";
import { PostType } from "../../common/types";

import styles from "./Post.module.scss";

export const Post: React.FC<PostType> = (props) => {
  const handleOnPostClick = () => {
    axios.get(`http://localhost:4500/posts/${props.id}`).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div onClick={handleOnPostClick} className={styles["post-wrapper"]}>
      <b>{props.userEmail}</b>
      <p className={styles["created-at"]}>{`Created: ${formatDate(
        props.createdAt
      )}`}</p>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
      <ul>
        {props.tags.length > 0
          ? props.tags.map((item, index) => <li key={index}>{`#${item}`}</li>)
          : "no tags :("}
      </ul>
      <span>{`Views: ${props.views}`}</span>
    </div>
  );
};
