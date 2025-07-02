import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    img: {
      type: String,
      default: "",
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
    createdPosts: {
      type: [String],
      default: [],
    },
    refreshToken: String,
    bio: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
