import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    friends: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    totalPostsCreated: {
      type: Number,
      default: 0,
    },
    socialProfiles:[
      {
        type:String
      }
    ],
    postsLiked: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    postsComments: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Create the User model
const User = mongoose.model("User", userSchema);
export default User;
