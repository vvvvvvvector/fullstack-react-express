import { createContext } from "react";

// interface UserType {
//   info: {
//     _id: string;
//     email: string;
//     password: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
//   token: string;
// }

export const UserContext = createContext<any>(null);
