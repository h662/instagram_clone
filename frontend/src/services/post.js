import api from "./api";

const postService = {
  createPost: async (postData) => {
    const response = await api.post("/api/posts", postData);
    return response.data;
  },

  getAllPosts: async (page = 0, size = 10) => {
    const response = await api.get("/api/posts", {
      params: { page, size },
    });
    return response.data.content;
  },

  getUserPosts: async (page = 0, size = 10, userId) => {
    const response = await api.get(`/api/posts/user/${userId}`, {
      params: { page, size },
    });
    return response.data.content;
  },

  getUserPostCount: async (userId) => {
    const response = await api.get(`/api/posts/user/${userId}/count`);
    return response.data.count;
  },

  updatePost: async (postId, postData) => {
    const response = await api.put(`/api/posts/${postId}`, postData);
    return response.data;
  },

  deletePost: async (postId) => {
    await api.delete(`/api/posts/${postId}`);
  },

  toggleLike: async (postId) => {
    const response = await api.post(`/api/posts/${postId}/like`);
    return response.data;
  },
};

export default postService;
