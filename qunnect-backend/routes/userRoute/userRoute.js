import express from 'express';
import { getUsers, updateUser, getUser, profile, deleteUser } from '../../controllers/authController.js';
import { uploadImage } from "../../middlewares/uploadImages.js";

const router=express.Router();

router.get('/:userId',getUser)
router.get('/get-users',getUsers);
router.get('/profile',profile);


router.put('/update/:userId', uploadImage.single("profilePhoto"), uploadImage.single("profileBanner"),updateUser);

router.delete('/delete/:userId',deleteUser);


export default router;
