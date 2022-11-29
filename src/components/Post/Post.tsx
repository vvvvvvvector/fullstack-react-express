import React from "react";

import { PostType } from "../../common/types";

import styles from "./Post.module.scss";

export const Post: React.FC<PostType> = (props) => {
  const formatDate = (createdAt: string) => {
    const d = new Date(createdAt);

    const fullYear = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDay();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    const dateAndTime: string = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${fullYear} at ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return dateAndTime;
  };

  return (
    <div className={styles["post-wrapper"]}>
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
