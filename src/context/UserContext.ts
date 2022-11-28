import { createContext } from "react";

import { UserType } from "../common/types";

export const UserContext = createContext<{
  user: UserType;
  setUser: (value: UserType) => void;
}>({
  user: null,
  setUser: () => undefined,
});
