import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import { NewPost } from "./components/NewPost/NewPost";

import { UserType } from "./common/types";

import UserContext from "./context/UserContext";

import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { toast, Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [user, setUser] = React.useState<UserType>(null);

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
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
