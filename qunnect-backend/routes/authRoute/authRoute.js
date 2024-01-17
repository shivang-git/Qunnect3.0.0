import express from 'express';
import { registerUser,loginUser, logoutUser, passwordReset, updatePassword, refreshToken } from '../../controllers/authController.js';
import { AuthMiddleware } from '../../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/reset-password/:token',updatePassword)
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',AuthMiddleware,logoutUser);
router.post('/reset-password',passwordReset)
router.post('/refresh-token',refreshToken)


export default router;