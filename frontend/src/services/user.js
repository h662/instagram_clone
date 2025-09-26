import api from "./api";

const userService = {
  getUserProfile: async (username) => {
    const response = await api.get(`/api/users/username/${username}`);
    return response.data;
  },
};

export default userService;
