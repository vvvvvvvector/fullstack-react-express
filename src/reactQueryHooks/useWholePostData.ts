import { useQuery } from "react-query";

import axios from "axios";

import { AwesomePost } from "../common/types";

const fetch = async (postId?: string) => {
  const { data } = await axios.get(`https://backend-iuo3.onrender.com/posts/${postId}`);

  return data.doc;
};

export const useWholePostData = (postId?: string) => {
  return useQuery(["post", postId], () => fetch(postId), {
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
