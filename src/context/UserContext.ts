import { createContext } from "react";

import { UserType } from "../common/types";

const UserContext = createContext<{
  user: UserType;
  setUser: (value: UserType) => void;
}>({
  user: null,
  setUser: () => undefined,
});

export default UserContext;
