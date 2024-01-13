import express from 'express';
import { registerUser,loginUser, getUsers, updateUser, getUser } from '../../controllers/authController.js';

const router=express.Router();

router.get('/get-users',getUsers);
router.get('/get-user',getUser);



router.post('/register',registerUser);
router.post('/login',loginUser);




router.put('/update',updateUser);






export default router;