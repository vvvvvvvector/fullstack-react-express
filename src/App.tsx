import React from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";

import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/Header";
import { SignIn } from "./components/SignIn/SignIn";

import { UserContext } from "./context/UserContext";

const App: React.FC = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem("jwt-token");

    if (token) {
      axios
        .get("http://localhost:4500/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
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
