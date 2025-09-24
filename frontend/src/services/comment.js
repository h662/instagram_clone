import api from "./api";

const commentService = {
  createComment: async (postId, content) => {
    const response = await api.post(`/api/comments/posts/${postId}`, {
      content,
    });
    return response.data;
  },
};

export default commentService;
