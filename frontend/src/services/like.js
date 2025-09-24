import api from "./api";

const likeService = {
  toggleLike: async (postId) => {
    const response = await api.post(`/api/likes/${postId}`);
    return response.data;
  },

  countLike: async (postId) => {
    const response = await api.get(`/api/likes/count/${postId}`);
    return response.data;
  },

  isLiked: async (postId) => {
    const response = await api.get(`/api/likes/is-liked/${postId}`);
    return response.data;
  },
};

export default likeService;
