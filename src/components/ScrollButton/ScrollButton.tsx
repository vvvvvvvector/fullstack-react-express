import React from "react";

import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";

import { scrollToTop } from "../../common/utils";

import styles from "./ScrollButton.module.scss";

export const ScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  window.addEventListener("scroll", () => {
    const scrolled = document.documentElement.scrollTop;

    const max = 200;

    if (scrolled > max) setIsVisible(true);
    else if (scrolled <= max) setIsVisible(false);
  });

  return isVisible ? (
    <div onClick={scrollToTop} className={styles.scroll}>
      <span>scroll to top</span>
      <NorthOutlinedIcon className={styles.arrow} fontSize="small" />
    </div>
  ) : null;
};
