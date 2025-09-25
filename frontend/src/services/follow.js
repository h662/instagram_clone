import api from "./api";

const followService = {
  toggleFollow: async (userId) => {
    const response = await api.post(`/api/users/${userId}/follow`);
    return response.data;
  },

  getFollowStatus: async (userId) => {
    const response = await api.get(`/api/users/${userId}/follow-status`);
    return response.data;
  },
};

export default followService;
