import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

import axios from "axios";

import { setUserToken } from "../common/utils";

import useUserContext from "../context/hooks/useUserContext";

const create = async (creditionals: { email: string; password: string }) => {
  const { data } = await axios.post(
    "https://backend-iuo3.onrender.com/auth/signup",
    {
      email: creditionals.email,
      password: creditionals.password,
    }
  );

  return data;
};

export const useCreateUser = () => {
  const navigate = useNavigate();

  const { setUser } = useUserContext();

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
