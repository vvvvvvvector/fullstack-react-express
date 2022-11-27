import mongoose from "mongoose";

const PostScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // referencer to model 'User'
      ref: "User", // relationship
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [], // if there are no tags while post creation
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  { timestamps: true }
); // in addtion: +when user was created +when user was updated

export default mongoose.model("Post", PostScheme);
