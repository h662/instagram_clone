import { create } from "zustand";
import { authService } from "../services/auth";

const useAuthStore = create((set) => ({
  user: "",
  isAuthenticated: "",
  loading: false,
  error: null,

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      await authService.register(userData);
      // set에 반영
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Registration failed",
      });
      throw err;
    }
  },
}));

export default useAuthStore;
