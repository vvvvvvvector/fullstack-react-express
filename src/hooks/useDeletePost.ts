import { useMutation, useQueryClient } from "react-query";

import axios from "axios";
import { toast } from "react-hot-toast";

const deletePost = ({ id }: { id: string }) => {
  return axios.delete(`http://localhost:4500/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("jwt-token")}`,
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
  });
};
