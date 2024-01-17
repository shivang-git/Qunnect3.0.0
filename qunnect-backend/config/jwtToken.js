import jwt from 'jsonwebtoken';

export const generateAccessToken=(userId)=> {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Short expiration time
  }
  
export const generateRefreshToken=(userId)=> {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); // Longer expiration time
  }