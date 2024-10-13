'use client'

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, getcommentPost, likePost } from "../features/posts/postSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import CommentCard from "./CommentCard";
import { ThumbsUp, MessageSquare, Share2, Send, MoreHorizontal, Smile } from 'lucide-react';

const CommentSchema = Yup.object({
  text: Yup.string().required("Required"),
});

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [allCmts, setAllCmts] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user.user._id));
  const fileInputRef = React.useRef(null);
  const comments = post?.comments;

  const handleLoadMore = () => {
    const lastComment = comments[comments.length - 1] || null;
    dispatch(getcommentPost({ postId: post._id, lastCommentId: lastComment?._id }));
  };

  useEffect(() => {
    setIsLiked(post.likes?.includes(user.user._id));
  }, [post?.likes, user.user._id, post]);

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handleAllCmts = () => {
    setAllCmts(!allCmts);
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
    (<div className="bg-white rounded-lg shadow-md mb-4 max-w-2xl mx-auto">
      <div className="p-4">
        {/* User Info with Three-Dot Menu */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/profile/${post.author.slug}`}
            className="flex items-center space-x-3">
            <img
              src={post.author.profilePhoto}
              alt={post.author.fullname}
              className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-gray-900 font-semibold hover:underline">
                {post.author.fullname}
              </p>
              <p className="text-gray-500 text-sm">{post.moments}</p>
            </div>
          </Link>
          <button
            className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800">{post?.text}</p>
        </div>

        {/* Post Image */}
        {post?.postImage && (
          <div className="mb-4">
            <img
              src={post?.postImage}
              alt="Post content"
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: "512px" }} />
          </div>
        )}

        {/* Like and Comment Counts */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
          <div className="flex items-center space-x-2">
            <ThumbsUp size={16} className="text-blue-500" />
            <span>{post?.likesCount || 0} Likes</span>
          </div>
          <button onClick={handleAllCmts} className="hover:underline">
            {post?.commentsCount || 0} Comments
          </button>
        </div>

        <hr className="my-2" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              isLiked ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:bg-gray-100"
            }`}>
            <ThumbsUp size={20} />
            <span>Like</span>
          </button>
          <button
            onClick={handleAllCmts}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200">
            <MessageSquare size={20} />
            <span>Comment</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>

        {/* Comment Form */}
        <form onSubmit={formik.handleSubmit} className="mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={user.user.profilePhoto}
              alt={user.user.fullname}
              className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-grow relative">
              <input
                type="text"
                name="text"
                placeholder="Add a comment..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
                <Send size={20} />
              </button>
            </div>
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Smile size={20} />
            </button>
          </div>
        </form>

        {/* Comments Section */}
        {allCmts && (
          <div className="mt-4">
            <h3 className="text-gray-900 font-semibold mb-2">Comments</h3>
            {comments?.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
            {comments.length > 0 ? (
              <button onClick={handleLoadMore} className="text-blue-500 hover:underline mt-2">
                Load More
              </button>
            ) : (
              <p className="text-gray-500 text-sm">No comments yet</p>
            )}
          </div>
        )}
      </div>
    </div>)
  );
};

export default PostCard;