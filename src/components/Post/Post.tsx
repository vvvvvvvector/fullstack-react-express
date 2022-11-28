import React from "react";
import { ComponentPostType } from "../../common/types";

import styles from "./Post.module.scss";

export const Post: React.FC<ComponentPostType> = ({
  userEmail,
  createdAt,
  title,
  text,
  tags,
  views,
}) => {
  const formatDate = (createdAt: string) => {
    const d = new Date(createdAt);

    const result: string = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}`;

    return result;
  };

  return (
    <div className={styles["post-wrapper"]}>
      <b>{userEmail}</b>
      <p className={styles["created-at"]}>{`Created at: ${formatDate(
        createdAt
      )}`}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <ul>
        {tags.length > 0
          ? tags.map((item, index) => <li key={index}>{`#${item}`}</li>)
          : "no tags :("}
      </ul>
      <span>{views}</span>
    </div>
  );
};
