import express from 'express';
import { registerUser,loginUser, getUsers, updateUser } from '../controllers/authController.js';

const router=express.Router();

router.get('/get-users',getUsers);




router.post('/register',registerUser);
router.post('/login',loginUser);




router.put('/update/:id',updateUser);






export default router;