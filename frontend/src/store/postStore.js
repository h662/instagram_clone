import { create } from "zustand";
import postService from "../services/post";

const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

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
