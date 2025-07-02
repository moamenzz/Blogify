import { create } from "zustand";
import { axiosPrivate, axiosPublic } from "../lib/axiosInstances";

export const usePostStore = create((set) => ({
  posts: [],
  featuredPosts: [],
  searchResultPosts: [],
  mainPost: [],
  recentPosts: [],
  createdPost: null,
  currentPage: 1,
  totalPosts: 0,
  totalPages: 0,
  error: null,
  isLoading: false,

  fetchPosts: async (page = 1) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get(`/posts?page=${page}&limit=6`);
      set({
        isLoading: false,
        posts: res.data.posts,
        totalPosts: res.data.totalPosts,
        totalPages: Math.ceil(res.data.totalPosts / 6),
        currentPage: page,
      });
      console.log(res.data.posts);
      console.log(res.data.totalPosts);
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  fetchFeaturedPosts: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get("/posts/featured-posts");
      set({ isLoading: false, featuredPosts: res.data });
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  fetchSinglePost: async (slug) => {
    try {
      set({ isLoading: true });
      const res = await axiosPublic.get(`/posts/${slug}`);
      set({
        isLoading: false,
        mainPost: res.data.post,
        recentPosts: res.data.recentPosts,
      });
      console.log(res.data);
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  searchPosts: async (query, category, page = 1) => {
    try {
      set({ isLoading: true });
      const searchParams = new URLSearchParams();
      if (query) searchParams.append("query", query);
      if (category) searchParams.append("category", category);
      searchParams.append("page", page);
      searchParams.append("limit", "6");

      const res = await axiosPublic.get(
        `/posts/search?${searchParams.toString()}`
      );
      set({
        isLoading: false,
        posts: res.data.posts,
        totalPages: res.data.totalPages,
      });
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
    }
  },
  createNewPost: async (postData, axiosPrivate) => {
    try {
      set({ isLoading: true });
      const res = await axiosPrivate.post("/posts/create-post", postData); //This will be switched to axiosPrivate when createPost is functional. Only authorized users are allowed to create posts
      const newPost = res.data;
      set({
        isLoading: false,
        createdPost: newPost,
      });
      return newPost;
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
      throw e;
    }
  },
  deletePost: async (slug, id) => {
    try {
      set({ isLoading: true });
      const res = await axiosPrivate.delete(`/posts/${slug}`, { id });
      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: e.response.data.error });
      throw e;
    }
  },
}));
