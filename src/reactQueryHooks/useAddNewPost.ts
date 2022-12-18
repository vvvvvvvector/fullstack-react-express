import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";

import { NewPost } from "../common/types";

import { getUserToken } from "../common/utils";

const addNewPost = ({ title, text, tags }: NewPost) => {
  return axios.post(
    "https://backend-iuo3.onrender.com/posts",
    {
      title,
      text,
      tags,
    },
    {
      headers: {
        Authorization: "Bearer " + getUserToken(),
      },
    }
  );
};

export const useAddNewPost = () => {
  const navigate = useNavigate();

  return useMutation(addNewPost, {
    onSuccess: () => {
      toast.success("Post was successfully added!");

      navigate("/");
    },
    onError: () => {
      toast.error("Error while creating post!");
    },
  });
};
