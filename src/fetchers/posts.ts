import axios from "axios";
import { PostType } from "../common/types";

export const fetchAllPosts = async () => {
  return await axios.get("http://localhost:4500/posts").then((response) => {
    let result: PostType[] = [];

    for (let i = 0; i < response.data.posts.length; i++) {
      result = [
        ...result,
        {
          id: response.data.posts[i]._id,
          userEmail: response.data.posts[i].user.email,
          createdAt: response.data.posts[i].createdAt,
          title: response.data.posts[i].title,
          text: response.data.posts[i].text,
          tags: response.data.posts[i].tags,
          views: response.data.posts[i].viewsCount,
        },
      ];
    }

    return result;
  });
};
