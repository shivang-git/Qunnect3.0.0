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
    profilePhoto: {
      type: String,
    },
    profileBanner: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    totalPostsCreated: {
      type: Number,
      default: 0,
    },
    socialProfiles:[
      {
        type:String
      }
    ],
    friends: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    postsCreated: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
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

userSchema.pre('save', async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre('find', async function(next) {
  this.populate({
    path: 'friends',
    count:true,
  });
  this.populate({
    path: 'postsCreated',
    count:true,
  });
  this.populate({
    path: 'postsLiked',
  });
  this.populate({
    path: 'postsComments',
  });
  next();
});


// Create the User model
const User = mongoose.model("User", userSchema);
export default User;
