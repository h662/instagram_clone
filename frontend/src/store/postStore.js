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
    }
  },
}));

export default usePostStore;
