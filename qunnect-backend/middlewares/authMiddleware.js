import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'




export const  AuthMiddleware= async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        try{
            if(token){
                const decoded=jwt.verify(token,process.env.SECRET_KEY)
                const user=await User.findById(decoded.id);
                req.user=user;
                next();
            }
        }catch(error){
            throw new Error("authorized token expired")
        }
    }else{
        throw new Error("No token found in header")
    }
}
