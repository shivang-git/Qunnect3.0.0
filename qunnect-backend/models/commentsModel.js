import mongoose from "mongoose";

import { timeAgo } from "../utils/time&date.js";

// Define the Comment Schema
const commentSchema = new mongoose.Schema(
  {
    author: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    postedOn: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
   
    createdAt: {
      type: Date,
      default: Date.now,
    },
    moments:{
      type:String,
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
  this.moments = timeAgo(this.createdAt);
  next();
});

commentSchema.pre('save', async function(next) {
  this.moments = timeAgo(this.createdAt); 
  next();
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

