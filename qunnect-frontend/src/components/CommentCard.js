'use client'

import React from "react";
import { Link, useParams } from "react-router-dom";
import { ThumbsUp, MessageSquare } from 'lucide-react';

const CommentCard = ({ comment }) => {
  const { slug } = useParams();

  return (
    (<div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex">
        <Link to={`/profile/${comment.author.slug}`} className="flex-shrink-0 mr-3">
          <img
            className="rounded-full w-10 h-10 object-cover"
            src={comment.author.profilePhoto}
            alt={`${comment.author.fullname}'s profile`} />
        </Link>
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            <Link
              to={`/profile/${comment.author.slug}`}
              className="text-sm font-semibold text-gray-900 hover:underline mr-2">
              {comment.author.fullname}
            </Link>
            <span className="text-xs text-gray-500">{comment.moments}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
          <div className="flex items-center text-xs text-gray-500">
            <button
              className="flex items-center hover:bg-gray-100 rounded-md py-1 px-2 transition-colors duration-200">
              <ThumbsUp size={16} className="mr-1" />
              <span>Like</span>
              {comment.likes > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">
                  {comment.likes}
                </span>
              )}
            </button>
            <button
              className="flex items-center hover:bg-gray-100 rounded-md py-1 px-2 ml-2 transition-colors duration-200">
              <MessageSquare size={16} className="mr-1" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>)
  );
};

export default CommentCard;