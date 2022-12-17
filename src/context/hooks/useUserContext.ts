import { useContext } from "react";

import UserContext from "../UserContext";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
