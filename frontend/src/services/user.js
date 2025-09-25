import api from "./api";

const userService = {
  getUserProfile: async (username) => {
    const response = await api.get(`/api/users/username/${username}`);
    console.log(response);
    return response.data;
  },
};

export default userService;
