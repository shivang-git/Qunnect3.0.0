import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
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
    fullname:{
      type:String,
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
    slug:{
      type:String,
      unique:true,
    },
    dob:{
      type:Date
    }
    ,
    bio: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default:process.env.DEFAULT_PROFILE,
    },
    profileBanner: {
      type: String,
      default:process.env.DEFAULT_BANNER
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
 
  const formatName=(name)=>{
    return name.trim().toLowerCase().replace(/^\w/,(c)=>c.toUpperCase());
  }


  this.firstname=formatName(this.firstname)
  this.lastname=formatName(this.lastname)

  if(!this.slug){
    const uniqueId=uuidv4().split('-')[0];
    this.slug=`${this.firstname}-${this.lastname}-${uniqueId}`;
  }

  this.fullname = `${this.firstname} ${this.lastname}`;

  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre('find', async function(next) {
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
