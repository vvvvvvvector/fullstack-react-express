import React from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";

import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/Header";
import { SignIn } from "./components/SignIn/SignIn";

import { UserType } from "./common/types";

import { UserContext } from "./context/UserContext";

const App: React.FC = () => {
  const [user, setUser] = React.useState<UserType>(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem("jwt-token");

    const fetchAuthMe = async () => {
      await axios
        .get("http://localhost:4500/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            alert(
              "It seems that yours jwt token is expired...\nSign in again to use the app"
            );
            window.localStorage.removeItem("jwt-token");
          } else {
            console.log(error.message);
          }
        });
    };

    if (token) {
      fetchAuthMe();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
