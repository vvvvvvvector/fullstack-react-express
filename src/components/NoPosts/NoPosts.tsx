import React from "react";

import InboxIcon from "@mui/icons-material/Inbox";

import styles from "./NoPosts.module.scss";

export const NoPosts: React.FC = () => {
  return (
    <div className={styles.empty}>
      <InboxIcon
        sx={{
          fontSize: "8rem",
        }}
      />
      <span>You haven't created any posts yet.</span>
    </div>
  );
};
