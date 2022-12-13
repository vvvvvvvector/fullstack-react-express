import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";

type NewPost = {
  title: string;
  text: string;
  tags: string[];
};

const addNewPost = ({ title, text, tags }: NewPost) => {
  return axios.post(
    "http://localhost:4500/posts",
    {
      title,
      text,
      tags,
    },
    {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("jwt-token"),
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
  });
};
