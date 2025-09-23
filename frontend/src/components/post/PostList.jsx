import { useEffect } from "react";
import usePostStore from "../../store/postStore";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts, fetchPosts } = usePostStore();

  const loadPosts = async () => {
    fetchPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => console.log(posts), [posts]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
