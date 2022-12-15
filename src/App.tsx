import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast, Toaster } from "react-hot-toast";

import axios from "axios";

import { Header } from "./components";
import { Home, SignIn, NewPost, WholePost, SignUp } from "./pages";

import { User } from "./common/types";

import UserContext from "./context/UserContext";
import { clearUserToken, getUserToken } from "./common/utils";

const App: React.FC = () => {
  const [user, setUser] = React.useState<User>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = getUserToken();

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
            clearUserToken();
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/post/:id" element={<WholePost />} />
        </Routes>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "20px",
            color: "#28282B",
          },
        }}
      />
    </>
  );
};

export default App;
