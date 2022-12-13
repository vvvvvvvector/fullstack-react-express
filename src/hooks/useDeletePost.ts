import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

import axios from "axios";

import { getUserToken } from "../common/utils";

const deletePost = ({ id }: { id: string }) => {
  return axios.delete(`http://localhost:4500/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("Post was successfully deleted!");
    },
    onError: () => {
      toast.error("Error while deleting post!");
    },
  });
};
