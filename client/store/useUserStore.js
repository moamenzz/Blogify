import { create } from "zustand";
import { axiosPublic } from "../lib/axiosInstances";

export const useUserStore = create((set) => ({
  user: null,
  createdPosts: [],
  isLoading: false,
  error: false,

  getProfile: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get(`/users/${id}`);
      set({ isLoading: false, user: res.data });
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  getUserPosts: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get(`/users/created-posts/${id}`);
      set({ isLoading: false, createdPosts: res.data });
      console.log(res.data);
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
}));
