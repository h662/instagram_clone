import api from "./api";

export const authService = {
  async register(userData) {
    const response = await api.post("/api/auth/register", userData);
    const { access_token, refresh_token, user } = response.data;

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refeshToken", refresh_token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },
};
