import { create } from "zustand";
import commentService from "../services/comment";

const useCommentStore = create((set) => ({
  comments: [],
  loading: false,
  error: null,

  createComment: async (postId, content) => {
    set({ loading: true, error: null });
    try {
      const newComment = await commentService.createComment(postId, content);
      set((state) => ({
        comments: [newComment, ...state.comments],
        loading: false,
      }));

      return newComment;
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to create post",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useCommentStore;
