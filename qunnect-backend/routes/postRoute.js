import express from 'express';
import {getPost,getPosts} from '../controllers/postController.js';

const router=express.Router();


router.post('/get-posts',getPosts);
router.post('/get-post',getPost);






export default router;