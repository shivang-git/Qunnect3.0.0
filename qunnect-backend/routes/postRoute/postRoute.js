import express from "express";
import {
  createComment,
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../../controllers/postController.js";
import { uploadImage } from "../../middlewares/uploadImages.js";

const router = express.Router();

router.get("/get-posts", getPosts);
router.get("/get-post/:postId", getPost);
router.get('/:postId/get-comments')


router.post("/create-post",uploadImage.single('postImage'), createPost);
router.post('/:postId/comment',createComment);


router.put("/update-post/:postId", updatePost);
router.put("/:postId/like", likePost);


router.delete("/delete-post/:postId", deletePost);

export default router;
