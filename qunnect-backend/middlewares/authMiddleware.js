import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token =req.cookies?.accessToken || req.header("Authorization").split(" ")[1];
    if (token) {
      const decodedToken= jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
      if(!user){
        throw new Error("Invalid access Token")
      }
      req.user = user;
     
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {}
};
