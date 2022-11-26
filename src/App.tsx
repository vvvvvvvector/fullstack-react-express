import React from "react";

import { SignIn } from "./components/SignIn/SignIn";

import "./scss/_app.scss";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <SignIn />
    </div>
  );
};

export default App;
