import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const {email}=req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
       return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user
    const newUser =await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
        throw new Error(error);
  }
};

export const loginUser = async(req, res) => {
  try {
    const {email,password}=req.body;
    const findUser=await User.findOne({email});
    if (findUser && (await findUser.isPasswordMatched(password)) ) {
        res.status(201).json({message:"user login successfully"});
    } else {
        res.status(400).json({ message: 'Invalid credential' });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async(req, res) => {
    const allUsers=await User.find();
    res.json(allUsers);
};

export const updateUser = async(req, res) => {
 try {
    const {id}=req.params
    const findUser=await User.findById(id);
    if(!findUser){
        return res.status(400).json({message:"No user found"});
    }
    const updateUser=await User.findByIdAndUpdate(id,req.body,{new:true});
    res.status(201).json(updateUser);
 } catch (error) {
    throw new Error(error);
 }
};

export const logoutUser = async(req, res) => {
  console.log("logout");
};
