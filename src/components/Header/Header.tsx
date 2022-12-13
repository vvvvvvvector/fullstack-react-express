import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import BiotechIcon from "@mui/icons-material/Biotech";

import { scrollToTop } from "../../common/utils";

import UserContext from "../../context/UserContext";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { setUser } = useContext(UserContext);

  const handleSignOut = () => {
    toast.success("Signed out successfully!");
    setUser(null);
    window.localStorage.removeItem("jwt-token");
    scrollToTop();
  };

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
      {window.localStorage.getItem("jwt-token") ? (
        <Link to="/">
          <Button onClick={handleSignOut} variant="outlined" color="error">
            Sign out
          </Button>
        </Link>
      ) : (
        <Stack spacing={3} direction="row">
          <Link to="/signin">
            <Button variant="outlined">Sign in</Button>
          </Link>
          <Button variant="outlined">Sign up</Button>
        </Stack>
      )}
    </div>
  );
};
