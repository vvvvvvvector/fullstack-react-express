import axios from "axios";
import { useQuery } from "react-query";

const fetch = async (postId: string) => {
  const response = await axios.get(`http://localhost:4500/posts/${postId}`);

  console.log(response.data.doc);

  return response.data.doc;
};

export const useFetchOnePost = (postId: string) => {
  return useQuery(["posts", postId], () => fetch(postId), {
    enabled: false,
  });
};
