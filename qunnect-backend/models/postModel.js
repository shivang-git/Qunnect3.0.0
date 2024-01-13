import mongoose from "mongoose";


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
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },{timestamps:true});
  

//middleware to populate likes, comments,likecount
postSchema.pre('find', async function(next) {
  this.populate({
    path: 'likes',
    count:true
  });
  this.populate({
    path:'comments',
    count:true
  });
  next();
});


  
  // Create the Post model
const Post = mongoose.model('Post', postSchema);
export default Post;
