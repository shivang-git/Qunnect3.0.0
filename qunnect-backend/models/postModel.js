import mongoose from "mongoose";


// Define the Post Schema
const postSchema = new mongoose.Schema({
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
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
    }
  },{timestamps:true});
  
  // Create the Post model
const Post = mongoose.model('Post', postSchema);
export default Post;
