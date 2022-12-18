import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { axiosInstanse, getJWTHeader } from "../../axiosInstance";

import { NewPost } from "../../common/types";

const addNewPost = ({ title, text, tags }: NewPost) => {
  return axiosInstanse.post(
    "/posts",
    {
      title,
      text,
      tags,
    },
    {
      headers: getJWTHeader(),
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
