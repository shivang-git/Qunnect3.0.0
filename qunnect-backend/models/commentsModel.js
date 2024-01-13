import mongoose from "mongoose";

// Define the Comment Schema
const commentSchema = new mongoose.Schema(
  {
    author: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedOn: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
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



// Middleware to automatically populate author and post on every query
commentSchema.pre('find', async function(next) {
  this.populate({
    path: 'author'
  });
  this.populate({
    path:'postedOn'
  });
  next();
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

