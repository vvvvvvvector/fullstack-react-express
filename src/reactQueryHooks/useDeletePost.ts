import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

import axios from "axios";

import { getUserToken } from "../common/utils";

const deletePost = ({ id }: { id?: string }) => {
  return axios.delete(`https://backend-iuo3.onrender.com/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
};

export const useDeletePost = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");

      toast.success("Post was successfully deleted!");

      if (pathname !== "/") navigate("/");
    },
    onError: () => {
      toast.error("Error while deleting post!");
    },
  });
};
