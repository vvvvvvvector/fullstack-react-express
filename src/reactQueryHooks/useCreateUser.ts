import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

import axios from "axios";

import { setUserToken } from "../common/utils";

import UserContext from "../context/UserContext";

const create = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("http://localhost:4500/auth/signup", {
    email,
    password,
  });

  return data;
};

export const useCreateUser = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  return useMutation(create, {
    onSuccess: (response) => {
      setUserToken(response.token);
      setUser({ _id: response.user._id, email: response.user.email });

      navigate("/");

      toast.success("Account was successfully created:>");
    },
    onError: () => {
      toast.error("Error while creating user!");
    },
  });
};
