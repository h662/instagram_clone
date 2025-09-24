import { create } from "zustand";
import postService from "../services/post";

const useLikeStore = create((set, get) => ({
  likes: {},
  loading: false,
  error: null,

  toggleLike: async (postId) => {
    set({ loading: true, error: null });

    try {
      const { isLiked, likeCount } = await postService.toggleLike(postId);

      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: {
            isLiked,
            likeCount,
          },
        },
        loading: false,
      }));

      return { isLiked, likeCount };
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to toggle like",
      });
      throw err;
    }
  },
}));

export default useLikeStore;
