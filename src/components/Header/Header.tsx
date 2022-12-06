import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import BiotechIcon from "@mui/icons-material/Biotech";

import UserContext from "../../context/UserContext";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    window.localStorage.removeItem("jwt-token");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
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

export default Header;
