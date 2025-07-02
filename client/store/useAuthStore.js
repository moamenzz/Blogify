import { create } from "zustand";
import { axiosPublic } from "../lib/axiosInstances";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  accessToken: null,
  username: null,
  error: null,
  id: null,
  roles: [],
  isLoading: false,
  isAuthenticated: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (status) => set({ isLoading: status }),

  signup: async (email, username, password, navigate) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.post("/auth/register", {
        email,
        username,
        password,
      });
      set({ isLoading: false });
      toast.success("Successfully registered");
      navigate("/login");
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  login: async (email, password, navigate) => {
    try {
      set({ isLoading: true, isAuthenticated: false });
      const res = await axiosPublic.post("/auth/login", {
        email,
        password,
        navigate,
      });
      set({
        isLoading: false,
        isAuthenticated: true,
        accessToken: res.data.accessToken,
        username: res.data.username,
        roles: res.data.roles,
        id: res.data.id,
      });
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  logout: async (navigate) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get("/auth/logout");
      set({ isLoading: false, accessToken: null, username: null, roles: [] });
      toast.success("Logged out successfully");
      navigate("/");
    } catch (e) {
      set({
        error: e.response.data.error || "Error logging out",
        isLoading: false,
      });
    }
  },
}));
