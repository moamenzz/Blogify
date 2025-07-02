import express from "express";
import {
  getAllPosts,
  getFeaturedPosts,
  getSinglePost,
  handleCreatePost,
  handleDeletePost,
  handleSearch,
} from "../controllers/postController.js";
import increaseVisit from "../middleware/increaseVisit.js";
import verifyJWT from "../middleware/verifyJWT.js";

export const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/featured-posts", getFeaturedPosts);
postRouter.get("/search", handleSearch);
postRouter.get("/:slug", increaseVisit, getSinglePost);
postRouter.post("/create-post", verifyJWT, handleCreatePost);
postRouter.delete("/:slug", verifyJWT, handleDeletePost);
