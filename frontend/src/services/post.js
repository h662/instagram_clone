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
    return response.data;
  },

  updatePost: async (postId, postData) => {
    const response = await api.put(`/api/posts/${postId}`, postData);
    return response.data;
  },

  deletePost: async (postId) => {
    await api.delete(`/api/posts/${postId}`);
  },
};

export default postService;
