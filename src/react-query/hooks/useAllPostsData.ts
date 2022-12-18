import { useQuery } from "react-query";

import { queryKeys } from "../constants";

import { axiosInstanse } from "../../axiosInstance";

import { AwesomePost } from "../../common/types";

const fetch = async () => {
  const { data } = await axiosInstanse.get("/posts");

  return data.posts;
};

export const useAllPostsData = () => {
  return useQuery(queryKeys.posts, fetch, {
    cacheTime: 20000,
    select: (data): AwesomePost[] => {
      return data.map((i: any) => {
        return {
          id: i._id,
          userEmail: i.user.email,
          createdAt: i.createdAt,
          title: i.title,
          text: i.text,
          tags: i.tags,
          views: i.viewsCount,
        };
      });
    },
  });
};
