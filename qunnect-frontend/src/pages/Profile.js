import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import ProfileBanner from "../components/ProfileBanner";
import EditProfile from "../components/EditProfile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfilepost } from "../features/posts/postSlice";
import { getprofileUsers } from "../features/users/userSlice";
import { useParams } from "react-router-dom";


const Profile = () => {
  const {slug}=useParams();

  const dispatch=useDispatch();
  const [editprofile,setEditprofile]=useState(false);
  const user = useSelector((state) => state.users.profileUser);
  const { posts } = useSelector((state) => state.posts);
  
  const userPosts = posts.filter(post => post?.author?._id === user?._id);
   
  useEffect(()=>{
    
    dispatch(getprofileUsers(slug))
  },[])

  return (
    <>
      <div className=" w-full px-0 bg-gray-100 lg:px-10  2xl:px-40 bg-bgColor lg:rounded-lg h-full  ">
        <ProfileBanner openEditprofile={setEditprofile} user={user} />
        <hr className="border-gray-800" />
        <div className="w-full flex flex-shrink-0 gap-2 lg:gap-4 pt-5 pb-10 h-full">
          <div className=" w-full lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <CreatePost />
          </div>
        
            <div className="  flex-1 h-full bg-primary px-5 flex flex-col gap-6 pt-8">
             <div> {userPosts?.map((post)=>(
                  <PostCard  key={post?._id} post={post}/>
                ))}</div>
              
            </div>
      
        </div>
      </div>

      {editprofile && <EditProfile closeEditprofile={setEditprofile}/>}
    </>
  );
};

export default Profile;
