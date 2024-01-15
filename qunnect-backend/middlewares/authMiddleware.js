import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'


export const  AuthMiddleware= async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      const id = jwt.verify(token, access_token_secret);
      const user=await User.findById(id);
      req.user=user;
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
}
