import { create } from "zustand";
import followService from "../services/follow";

const useFollowStore = create((set) => ({
  followStatus: null,
  followers: null,
  following: null,
  loading: false,
  error: null,

  toggleFollow: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { following, followersCount, followingCount } =
        await followService.toggleFollow(userId);

      set({
        followStatus: {
          isFollowing: following,
          followersCount,
          followingCount,
        },
        loading: false,
      });

      return { isFollowing: following, followersCount, followingCount };
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to toggle follow",
        loading: false,
      });
      throw err;
    }
  },

  getFollowStatus: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { following, followersCount, followingCount } =
        await followService.getFollowStatus(userId);

      set({
        followStatus: {
          isFollowing: following,
          followersCount,
          followingCount,
        },
        loading: false,
      });

      return { isFollowing: following, followersCount, followingCount };
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to get follow status",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useFollowStore;
