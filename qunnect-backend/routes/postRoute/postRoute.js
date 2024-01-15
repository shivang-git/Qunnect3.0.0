import express from "express";
import {
  createComment,
  createPost,
  deletePost,
  getComment,
  getPost,
  getPosts,
  likePost,
  profilePosts,
  updatePost,
} from "../../controllers/postController.js";
import { uploadImage } from "../../middlewares/uploadImages.js";

const router = express.Router();

router.get('/:postId/get-comments',getComment);
router.get('/:userId/posts',profilePosts);
router.get("/get-post/:postId", getPost);
router.get("/get-posts", getPosts);


router.post('/:postId/comment',createComment);
router.post("/create-post",uploadImage.single('postImage'), createPost);


router.put("/:postId/like", likePost);
router.put("/update-post/:postId", updatePost);


router.delete("/delete-post/:postId", deletePost);

export default router;
