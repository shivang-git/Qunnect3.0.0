import express from 'express';
import { getUsers, updateUser, getUser, profile, deleteUser } from '../../controllers/userController.js';
import { uploadImage } from "../../middlewares/uploadImages.js";
import { AuthMiddleware } from '../../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/:userId',AuthMiddleware,getUser)
router.get('/get-users',AuthMiddleware,getUsers);
router.get('/profile',AuthMiddleware,profile);


router.put('/update/:userId',AuthMiddleware, uploadImage.single("profilePhoto"), uploadImage.single("profileBanner"),updateUser);

router.delete('/delete/:userId',AuthMiddleware,deleteUser);


export default router;
