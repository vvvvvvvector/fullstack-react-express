import { useQuery } from "react-query";
import { queryKeys } from "../constants";

import { axiosInstanse } from "../../axiosInstance";

import { AwesomePost } from "../../common/types";

const fetch = async (postId?: string) => {
  const { data } = await axiosInstanse.get(`/posts/${postId}`);

  return data.doc;
};

export const useWholePostData = (postId?: string) => {
  return useQuery([queryKeys.post, postId], () => fetch(postId), {
    select: (data): AwesomePost => {
      return {
        id: data._id,
        userEmail: data.user.email,
        createdAt: data.createdAt,
        title: data.title,
        text: data.text,
        tags: data.tags,
        views: data.viewsCount,
      };
    },
  });
};
