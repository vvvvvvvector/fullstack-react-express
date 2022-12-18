import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { queryKeys } from "../constants";

import { axiosInstanse, getJWTHeader } from "../../axiosInstance";

const deletePost = ({ id }: { id?: string }) => {
  return axiosInstanse.delete(`/posts/${id}`, {
    headers: getJWTHeader(),
  });
};

export const useDeletePost = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.posts);

      toast.success("Post was successfully deleted!");

      if (pathname !== "/") navigate("/");
    },
    onError: () => {
      toast.error("Error while deleting post!");
    },
  });
};
