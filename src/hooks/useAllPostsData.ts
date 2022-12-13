import axios from "axios";
import { useQuery } from "react-query";

const fetch = async () => {
  const response = await axios.get("http://localhost:4500/posts");

  return response.data.posts;
};

export const useAllPostsData = () => {
  return useQuery("posts", fetch, {
    cacheTime: 20000,
    select: (data) => {
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
