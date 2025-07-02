import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import { createPostSchema } from "../../schemas/createPost.schema.js";
import slugify from "slugify";

export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("user", "username img _id");

    const totalPosts = await Post.countDocuments();

    res.status(200).json({ posts, totalPosts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const getFeaturedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .populate("user", "username img _id");
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug }).populate(
      "user",
      "username img _id"
    );

    const recentPosts = await Post.find({ slug: { $ne: slug } })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("user", "username img _id");

    res.status(200).json({ post, recentPosts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const handleCreatePost = async (req, res) => {
  try {
    const userId = req.Id;
    if (!userId) return res.status(400).json({ error: "User not found" });

    const { content, contentImg, ...restData } = req.body;

    const validationResult = createPostSchema.safeParse(restData);

    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }

    if (!content || content.length < 128) {
      return res.status(400).json({
        error:
          "Content must be at least 128 characters and not exceed 10,000 characters",
      });
    }

    const { coverImg, title, category, desc } = validationResult.data;

    const cloudinaryOptions = {
      folder: "blog_posts",
      upload_preset: "blog_posts",
      allowed_formats: ["jpg", "png", "webp", "jpeg"],
      resource_type: "image",
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "auto" },
        { format: "webp" },
        {
          width: 1200,
          height: 630,
          crop: "fill",
          gravity: "auto",
        },
      ],
    };

    let coverImageUrl;
    let contentImageUrl;

    if (coverImg) {
      const uploadResponse = await cloudinary.uploader.upload(coverImg, {
        ...cloudinaryOptions,
        transformation: [
          ...cloudinaryOptions.transformation,
          { effect: "improve" },
        ],
      });
      coverImageUrl = uploadResponse.secure_url;
    }

    if (contentImg) {
      const uploadResponse = await cloudinary.uploader.upload(contentImg, {
        ...cloudinaryOptions,
        transformation: [
          { quality: "auto" },
          { fetch_format: "auto" },
          { format: "webp" },
          {
            width: 800,
            height: 600,
            crop: "limit",
          },
        ],
      });
      contentImageUrl = uploadResponse.secure_url;
    }

    const baseSlug = slugify(title, { lower: true, strict: true });
    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    const newPost = new Post({
      title,
      desc,
      slug: uniqueSlug,
      content,
      category,
      user: userId, // This points to the user.model.js
      img: coverImageUrl,
      contentImg: contentImageUrl ? [contentImageUrl] : [],
    });

    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const handleSearch = async (req, res) => {
  try {
    const { query, category, page = 1, limit = 6 } = req.query;
    let searchQuery = {};

    if (query && query.trim() !== "") {
      const searchRegex = RegExp(query, "i");
      searchQuery.$or = [{ title: searchRegex }, { slug: searchRegex }];
    }

    if (category && category !== "") {
      searchQuery.category = category;
    }

    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("user", "username img _id");

    res.status(200).json({ posts, totalPosts, totalPages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const handleDeletePost = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) res.status(400).json({ error: "Post ID not found" });

    const id = req.Id;
    if (!id)
      return res
        .status(400)
        .json({ error: "User doesnt match or isnt logged in" });

    const post = await Post.findOne({ slug });
    await post.deleteOne();
    res.status(201).json({ message: "Post deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
