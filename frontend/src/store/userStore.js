import { create } from "zustand";
import userService from "../services/user";

const useUserStore = create((set) => ({
  userProfile: null,
  loading: false,
  error: null,

  getUserProfile: async (username) => {
    set({ loading: true, error: null });
    try {
      const userProfile = await userService.getUserProfile(username);

      set({
        userProfile,
        loading: false,
      });

      return { userProfile };
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to get user profile",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useUserStore;
