import axios from "axios";
import { useQuery } from "react-query";

const fetch = async (postId: string) => {
  const { data } = await axios.get(`http://localhost:4500/posts/${postId}`);

  return data.doc;
};

export const useOnePostData = (postId: string) => {
  return useQuery(["post", postId], () => fetch(postId), {
    enabled: false,
  });
};
