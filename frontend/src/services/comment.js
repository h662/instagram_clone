import api from "./api";

const commentService = {
  createComment: async (postId, content) => {
    const response = await api.post(`/api/comments/posts/${postId}`, {
      content,
    });
    return response.data;
  },

  fetchComments: async (postId) => {
    const response = await api.get(`/api/comments/posts/${postId}`);
    return response.data.content;
  },
};

export default commentService;
