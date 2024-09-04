import express from 'express';
import { getUsers, updateUser, getUser, profile, deleteUser, isFriend, getFriends, searchContact } from '../../controllers/userController.js';
import { uploadImage } from "../../middlewares/uploadImages.js";
import { AuthMiddleware } from '../../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/get-users',AuthMiddleware,getUsers);
router.get('/get-friends',AuthMiddleware,getFriends)
router.get('/search-contact',AuthMiddleware,searchContact);
router.get('/profile/:slug',AuthMiddleware,profile);
router.get('/:userId',AuthMiddleware,getUser)
router.patch('/friend/:userId',AuthMiddleware,isFriend)
router.patch('/update/:userId',AuthMiddleware, uploadImage.single("profilePhoto"), uploadImage.single("profileBanner"),updateUser);

router.delete('/delete/:userId',AuthMiddleware,deleteUser);


export default router;
