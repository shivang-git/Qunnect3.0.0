import express from 'express';
import { registerUser,loginUser, logoutUser, passwordReset, updatePassword } from '../../controllers/authController.js';

const router=express.Router();

router.post('/reset-password/:token',updatePassword)
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/reset-password',passwordReset)


export default router;