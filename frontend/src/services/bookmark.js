import api from "./api";

const bookmarkService = {
  toggleBookmark: async (postId) => {
    const response = await api.post(`/api/bookmarks/${postId}`);
    return response.data;
  },

  getIsBookmarked: async (postId) => {
    const response = await api.get(`/api/bookmarks/${postId}/status`);
    return response.data;
  },

  getBookmarkedPosts: async () => {
    const response = await api.get(`/api/bookmarks`);
    return response.data.content;
  },
};

export default bookmarkService;
