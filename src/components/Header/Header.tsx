import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import BiotechIcon from "@mui/icons-material/Biotech";

import { UserContext } from "../../context/UserContext";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSignOut = () => {
    setUser(null);
    window.localStorage.removeItem("jwt-token");
    navigate("/");
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
      {user ? (
        <Button onClick={onSignOut} variant="outlined" color="error">
          Sign out
        </Button>
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
