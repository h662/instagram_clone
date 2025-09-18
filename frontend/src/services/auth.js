import api from "./api";

export const authService = {
  async register(userData) {
    const response = await api.post("/api/auth/register", userData);

    console.log(response);
  },
};
