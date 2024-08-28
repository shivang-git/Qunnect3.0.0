import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/emailConfig.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/jwtToken.js";

//access and refresh token required
export const registerUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password,dob } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      dob
    });

    const savedUser = await User.findById(newUser._id).select("-password");
    return res.status(201).json(savedUser);
  } catch (error) {
    throw new Error(error);
  }
};

//access token required
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isCorrect = user?.isPasswordMatched(password);

    if (!user || !isCorrect) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ user, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error login user" });
  }
};

//not done
export const logoutUser = async (req, res) => {
  try {
    const loggedOut = await User.findByIdAndUpdate(
      req.user?.id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    ).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ loggedOut, msg: "User LoggedOut Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logout user" });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) {
    throw new Error("Unauthorised user");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken?.id);

  if (!user) {
    return res.json({ msg: "Invallid refresh Token" });
  }
  if (token !== user.refreshToken) {
    return res.json({ msg: "Refresh Token is expired" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ user, accessToken, refreshToken });
};

//password reset token done
export const passwordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: ["User not found"] });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Expires in 1 hour
    });

    // Send password reset email
    const resetUrl = `<p>Follow the given link to reset the password.this link is valid till 1 hr.</p> <a href=${process.env.HOST}reset-password/${resetToken}> Click here </a>`;
    const data = {
      to: email,
      text: "Qunnect reset password",
      subject: "forget password link",
      html: resetUrl,
    };
    sendEmail(data);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to send password reset email"] });
  }
};

//reset-password done
export const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Verify password reset token
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ errors: ["Invalid password reset token"] });
    }

    // Update user password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ errors: ["Failed to reset password"] });
  }
};
