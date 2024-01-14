import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const cloudinaryUploadImg = async (fileToUpload) => {
     const cloudinaryResult = await cloudinary.uploader.upload(fileToUpload,{folder: 'qunnect'});
     return (cloudinaryResult.secure_url);

};


export const cloudinaryDeleteImg = async (fileToDelete) => {
  await cloudinary.uploader.destroy(fileToDelete,{folder: 'qunnect'});

};