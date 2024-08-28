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
import { AuthMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/:postId/get-comments',AuthMiddleware,getComment);
router.get('/:userId/posts',AuthMiddleware,profilePosts);
router.get("/get-post/:postId",AuthMiddleware, getPost);
router.get("/get-posts",AuthMiddleware, getPosts);


router.post('/:postId/comment',AuthMiddleware,uploadImage.none(),createComment);
router.post("/create-post",AuthMiddleware,uploadImage.single('postImage'), createPost);


router.patch("/:postId/like",AuthMiddleware, likePost);
router.put("/update-post/:postId",AuthMiddleware, updatePost);


router.delete("/delete-post/:postId",AuthMiddleware, deletePost);

export default router;
