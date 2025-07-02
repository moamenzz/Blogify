import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(6, "Title must be at least 6 characters")
    .max(70, "Title must be at least 70 characters"),
  desc: z
    .string()
    .min(12, "Description must be at least 12 characters")
    .max(150, "Description must be less than 150 characters"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  coverImg: z.string().min(1, "Cover Image is required"),
});
