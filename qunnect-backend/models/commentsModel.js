import mongoose from "mongoose";

// Define the Comment Schema
const commentSchema = new mongoose.Schema(
  {
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    cmtDesc: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

