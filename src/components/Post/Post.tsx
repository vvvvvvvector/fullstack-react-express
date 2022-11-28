import React from "react";
import { ComponentPostType } from "../../common/types";

import styles from "./Post.module.scss";

export const Post: React.FC<ComponentPostType> = (props) => {
  const formatDate = (createdAt: string) => {
    const d = new Date(createdAt);

    const result: string = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}`;

    return result;
  };

  return (
    <div className={styles["post-wrapper"]}>
      <b>{props.userEmail}</b>
      <p className={styles["created-at"]}>{`Created at: ${formatDate(
        props.createdAt
      )}`}</p>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
      <ul>
        {props.tags.length > 0
          ? props.tags.map((item, index) => <li key={index}>{`#${item}`}</li>)
          : "no tags :("}
      </ul>
      <span>{`views: ${props.views}`}</span>
    </div>
  );
};
