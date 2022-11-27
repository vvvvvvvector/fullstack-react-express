import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";

import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.home}>
      <h1>Home page!</h1>
      <span>
        {user
          ? "Signed in successfully!"
          : "Sign in to see information about yourself!"}
      </span>
      {user && <pre>{JSON.stringify(user.info, null, 2)}</pre>}
    </div>
  );
};
