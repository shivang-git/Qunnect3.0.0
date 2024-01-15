import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/emailConfig.js";

//access and refresh token required
export const registerUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
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
    });
    res.status(201).json(newUser);
  } catch (error) {
    throw new Error(error);
  }
};

//access token required
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (user && (await user.isPasswordMatched(password))) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await user.updateOne({ refreshToken });
      res.json({ accessToken });
    } else {
      return res.status(400).json({ message: "Invalid credential" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error login user" });
  }
};

//not done
export const logoutUser = async (req, res) => {
  console.log("logout");
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
