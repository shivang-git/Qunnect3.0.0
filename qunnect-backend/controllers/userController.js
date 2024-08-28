import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { cloudinaryDeleteImg, cloudinaryUploadImg } from "../utils/cloudinaryConfig.js";

export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: currentUserId }
        }
      },{
        $project: {
          firstname: 1,
          lastname:1,
          email: 1,
          profilePhoto: 1
        }
      }
    ])
   
    res.json(users);
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
  const { slug } = req.params;
  try {
    
    const user = await User.findOne({slug});
    
    const posts = await Post.find({ author: user._id })
      .populate('author', 'fullname profilePhoto profileBanner') // Populate author details
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 3 }, // Populate comments with sorting and limit
      });
    res.json({posts,user});
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


 
export const isFriend = async (req, res) => {
  const userId=req.user.id
  const friendId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    
    if (user.friends.includes(friendId)) {
        // If they are already friends, remove each other's IDs
        user.friends = user.friends.filter(id => id.toString() !== friendId.toString());
        friend.friends = friend.friends.filter(id => id.toString() !== userId.toString());
    } else {
        // If they are not friends, add each other's IDs
        user.friends.push(friendId);
        friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    res.status(200).json({friendId:friend._id});
} catch (error) {
    res.status(500).json({ error: 'Error updating friend status' });
}
}

export const getFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId)
  .populate('friends', 'firstname lastname email profilePhoto')

    if (!user) {
      return res.status(404).json({ errors: { user: "User not found" } });
    }

    res.json(user.friends); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to fetch user"] });
  }
};