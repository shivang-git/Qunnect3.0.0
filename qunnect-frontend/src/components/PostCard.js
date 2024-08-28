import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, getcommentPost, likePost } from "../features/posts/postSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import CommentCard from "./CommentCard";
const CommentSchema = Yup.object({
  text: Yup.string().required("Required"),
});

const PostCard = ({ post, user }) => {
  const dispatch = useDispatch();
  const [allCmts, setAllCmts] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.user._id));
  const fileInputRef = React.useRef(null);
  const comments=post?.comments

  const handleLoadMore = () => {
    const lastComment = (comments[comments.length-1])?comments[comments.length-1]:null;      
      dispatch(getcommentPost({postId:post._id,lastCommentId:lastComment._id}));
};

  useEffect(() => {
    setIsLiked(post.likes.includes(user.user._id));
  }, [post.likes, user.user._id,post]);

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handleAllCmts = () => {
    setAllCmts(!allCmts)

  };

  
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: CommentSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("text", values.text);

      dispatch(commentPost({ postId: post._id, postData: formData }))
      .unwrap()
      .then(() => {
        formik.resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      })
      .catch((error) => {
        console.error("Error creating comment:", error.message);
      });
    },
  });


  return (
    <>
      <div className="bg-white w-1/2 p-4 rounded-lg shadow-sm mb-4">
        {/* User Info with Three-Dot Menu */}
        <div className="flex  items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={user.user.profilePhoto}
              alt="User Avatar"
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-gray-800 text-sm font-semibold">
                {post.author.firstname} {post.author.lastname}
              </p>
              <p className="text-gray-500 text-xs">{post.moments}</p>
            </div>
          </div>
          <div className="text-gray-500 cursor-pointer">
            {/* Three-dot menu icon */}
            <button className="hover:bg-gray-100 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={12} cy={7} r={1} />
                <circle cx={12} cy={12} r={1} />
                <circle cx={12} cy={17} r={1} />
              </svg>
            </button>
          </div>
        </div>
        {/* Message */}
        <div className="mb-0 px-1 py-2">
          <p className="text-gray-800 text-sm">{post?.text}</p>
        </div>
        <hr className="py-2" />
        {/* Image */}
        {post?.postImage && (
          <div className="relative mb-2">
            <div className="flex items-center justify-center w-full h-auto overflow-hidden">
              <img
                src={post?.postImage}
                alt="Post Image"
                className="object-contain w-full h-full"
                style={{ maxHeight: "240px" }} // Set a maximum height for better control
              />
            </div>
          </div>
        )}
        <hr className="py-2" />
        {/* Like and Comment Section */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-full ${
                isLiked ? "text-red-500" : ""
              }`}
            >
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{post?.likesCount || 0} Likes</span>
            </button>
          </div>
          <button
            className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-full"
            onClick={handleAllCmts}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              />
            </svg>
            <span>{post?.commentsCount || 0} Comments</span>
          </button>
        </div>
        <hr className="mt-2 mb-2" />

        <form className="bg-white shadow rounded-lg mb-6 p-4 w-full" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <textarea
              name="text"
              id="text"
              className=" focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
              placeholder="Write a comment"
              value={formik.values.text}
              onChange={formik.handleChange("text")}
              onBlur={formik.handleBlur("text")}
            ></textarea>
            <span className="flex absolute right-2 top-2/4 -mt-3 items-center">
              <svg
                className="mr-2"
                style={{ width: 22, height: 22, cursor: "pointer" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
                ></path>
              </svg>
             <button type="submit"> <svg
                className="fill-blue-500"
                style={{ width: 24, height: 24, cursor: "pointer" }}
                viewBox="0 0 24 24"
              >
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg></button>
            </span>
          </div>
        </form>

        <div className={`mt-2 ${allCmts ? "block" : "hidden"}`}>
          <p className="text-gray-800 text-sm font-semibold">Comments</p>
          <hr className="mt-2 mb-2" />
          {comments?.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
          {(comments.length>0) ? (
        <button onClick={handleLoadMore}>Load More</button>
      ) : (
        <div  className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-full text-sm"><span>No comments</span></div>
      )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
