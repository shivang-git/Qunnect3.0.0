import mongoose from "mongoose";
import { timeAgo } from "../utils/time&date.js";


// Define the Post Schema
const postSchema = new mongoose.Schema({
    author: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    postImage: {
      type: String,
    },
    likes: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    moments:{
      type:String,
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },{timestamps:true});
  

postSchema.pre('find', async function(next) {
  this.moments = timeAgo(this.createdAt);
  next();
});

postSchema.pre('save', async function(next) {
  this.moments = timeAgo(this.createdAt); 
  next();
});


  
  // Create the Post model
const Post = mongoose.model('Post', postSchema);
export default Post;
