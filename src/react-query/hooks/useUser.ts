import React from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { axiosInstanse } from "../../axiosInstance";

import { User } from "../../common/types";

import { clearUserToken, getUserToken } from "../../common/utils";

const authMe = async () => {
  const { data } = await axiosInstanse.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

  return data.user;
};

export const useUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User>(null);

  useQuery("user", authMe, {
    enabled: getUserToken() !== null,
    onSuccess: ({ _id, email }) => {
      setUser({
        _id,
        email,
      });
    },
    onError: () => {
      navigate("/");
      clearUserToken();
      setUser(null);
      toast.error(
        "It seems that Yours token is expired...\nSign in again to use the app.",
        {
          duration: 10000,
        }
      );
    },
  });

  return { user, setUser };
};
