import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id }).select(
      "-password -roles -refreshToken -email"
    );
    if (!user) return res.status(404).json({ error: "User not Found" });

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const getUserCreatedPosts = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    if (!user) return res.status(404).json({ error: "User not Found" });

    const createdPostsSlugs = user.createdPosts;

    const createdPosts = await Post.find({ slug: { $in: createdPostsSlugs } });

    return res.status(200).json(createdPosts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
};
