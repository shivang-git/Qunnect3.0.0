import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentsModel.js";
import fs from "fs";
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from "../utils/cloudinaryConfig.js";

//--------------------post section
//get all the post on the webapp
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstname lastname") // populate author during fetching post
      .sort({ createdAt: -1 }); //sort by recent post

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get posts" });
  }
};

//get a single post
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate(
      "author",
      "firstname lastname"
    );

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get a post" });
  }
};

//get a post related to a particular user
export const profilePosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId })
      .populate("author")
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching posts" });
  }
};



//Done with image upload to cloudinary
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postImage = req.file;
    const postImage_url = await cloudinaryUploadImg(postImage.path);
    const newPost = await Post.create({
      author: req.user._id,
      text,
      postImage: postImage_url,
    });
    fs.unlinkSync(postImage.path);

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "error in creating post" });
  }
};

//not completed
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { quote: req.body.quote },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//complete ***Only image deletion required
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    //find the post to delete it
    const post = await Post.findById(postId);

    //check if user deleting a post should be author
    if (!post || post.author.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unathorised can't delete post" });
    }

    //deleting from cloudinary
    // if(post.postImage){
    //   await cloudinaryDeleteImg(post.postImage);
    // }
    //deleting is not done

    await post.delete();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error occur deleting a post" });
  }
};

//comment section
//comment on a particular post done
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create and save comment
    const comment = await Comment.create({
      author: req.user._id,
      text,
      postedOn: postId,
    });
    post.commentsCount++;
    await post.save();

    // Return created comment details
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to comment" });
  }
};

// //get all comment on particular post done
// export const getComment=async(req,res)=>{
//   try {

//   } catch (error) {

//   }

// }

//like section
//done like and unlike a specific post

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      // Already liked, unlike
      post.likes.pull(userId);
      post.likesCount--; //unlike count
    } else {
      // Like the post
      post.likes.push(userId);
      post.likesCount++;
    }

    await post.save();

    res.json({ likes: post.likesCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
