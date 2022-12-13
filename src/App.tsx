import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast, Toaster } from "react-hot-toast";

import axios from "axios";

import { Home, Header, SignIn, NewPost } from "./components/";

import { User } from "./common/types";

import UserContext from "./context/UserContext";

const App: React.FC = () => {
  const [user, setUser] = React.useState<User>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem("jwt-token");

    const fetchAuthMe = () => {
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
          if (error.response.status === 403) {
            toast.error(
              "It seems that yours jwt token is expired...\nSign in again to use the app"
            );

            setUser(null);
            window.localStorage.removeItem("jwt-token");
            navigate("/");
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
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
