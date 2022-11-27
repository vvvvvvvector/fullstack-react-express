import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import styles from "./Header.module.scss";

import BiotechIcon from "@mui/icons-material/Biotech";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div>
          <BiotechIcon sx={{ color: "#28282B" }} fontSize="large" />
          <h3>
            My beautiful app <span>🤯</span>
          </h3>
        </div>
      </Link>
      <Stack spacing={3} direction="row">
        <Link to="/signin">
          <Button variant="outlined">Sign in</Button>
        </Link>
        <Button variant="outlined">Sign up</Button>
      </Stack>
    </div>
  );
};
