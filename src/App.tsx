import React from "react";
import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

import { Header } from "./components";
import { Home, SignIn, NewPost, WholePost, SignUp } from "./pages";

import { useUser } from "./react-query/hooks/useUser";

import UserContext from "./context/UserContext";

const App: React.FC = () => {
  const { user, setUser } = useUser();

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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
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
