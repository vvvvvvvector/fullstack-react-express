import { createContext } from "react";

import { User } from "../common/types";

const UserContext = createContext<{
  user: User;
  setUser: (value: User) => void;
}>({
  user: null,
  setUser: () => undefined,
});

export default UserContext;
