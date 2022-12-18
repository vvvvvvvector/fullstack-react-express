import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import BiotechIcon from "@mui/icons-material/Biotech";

import { clearUserToken, getUserToken, scrollToTop } from "../../common/utils";

import useUserContext from "../../context/hooks/useUserContext";

import styles from "./Header.module.scss";
import { useQueryClient } from "react-query";

export const Header: React.FC = () => {
  const { setUser } = useUserContext();

  const handleSignOut = () => {
    toast.success("Signed out successfully!");
    setUser(null);
    clearUserToken();
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
      {getUserToken() ? (
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
          <Link to="/signup">
            <Button variant="outlined">Sign up</Button>
          </Link>
        </Stack>
      )}
    </div>
  );
};
