import { create } from "zustand";
import postService from "../services/post";

const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await postService.createPost(postData);
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to create post",
        loading: false,
      });
      throw err;
    }
  },

  fetchPosts: async (page = 0, refresh = false) => {
    set({ loading: true, error: null });
    try {
      const response = await postService.getAllPosts(page);

      set({
        posts: response.content,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to fetch posts",
        loading: false,
      });
      throw err;
    }
  },

  updatePost: async (postId, postData) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = await postService.updatePost(postId, postData);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === postId ? updatedPost : p)),
        loading: false,
      }));
      return updatedPost;
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to update post",
        loading: false,
      });
      throw err;
    }
  },

  deletePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await postService.deletePost(postId);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== postId),
        // userPosts
        // currentPost
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to delete post",
        loading: false,
      });
      throw err;
    }
  },
}));

export default usePostStore;
