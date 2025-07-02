import express from "express";
import {
  getUserCreatedPosts,
  getUserProfile,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/:id", getUserProfile);
userRouter.get("/created-posts/:id", getUserCreatedPosts);
