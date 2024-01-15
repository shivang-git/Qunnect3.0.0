import User from "../models/userModel.js";
import { cloudinaryDeleteImg, cloudinaryUploadImg } from "../utils/cloudinaryConfig.js";

export const getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    res.json(users); // Return the list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to fetch users"] });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ errors: { user: "User not found" } }); // Handle user not found
    }

    res.json(user); // Return the user
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to fetch user"] });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user); // Return the authenticated user
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to fetch user data"] });
  }
};

//done
export const updateUser = async (req, res) => {
  try {
    const { profilePhoto, profileBanner } = req.file;
    const user = req.user;

    if (profilePhoto) {
      try {
        const dp = await cloudinaryUploadImg(profilePhoto.path);
        user.profilePhoto = dp;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ errors: ["Failed to upload photo"] });
      }
      // Remove the temporary disk file
      fs.unlinkSync(profilePhoto.path);
    }
    if (profileBanner) {
      try {
        const banner = await cloudinaryUploadImg(profileBanner.path);
        user.profileBanner = banner;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ errors: ["Failed to upload banner"] });
      }
      // Remove the temporary disk file
      fs.unlinkSync(profileBanner.path);
    }

    // Update other user fields
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Failed to update user" });
  }
};

//deletion done
export const deleteUser = async (req, res) => {
  try {
    const user=await User.findbyId(req.user._id);
    if (!user) {
        return res.status(404).json({ errors: { user: "User not found" } }); // Handle user not found
    }

    if(user.profilePhoto){
        await cloudinaryDeleteImg(user.profilePhoto);
    }
    if(user.profileBanner){
        await cloudinaryDeleteImg(user.profileBanner);
    }

    // Delete user from database
    await user.delete();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to delete user"] });
  }
};
