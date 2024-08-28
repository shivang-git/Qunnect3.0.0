import React from "react";
import { Link, useParams } from "react-router-dom";

const CommentCard = ({comment}) => {
  const {slug}=useParams()
    
  return (
    <>
      <div className="pt-4">
        {/* Comment row */}
        <div className="flex pb-3">
          <Link to={`/profile/${comment.author.slug}`} className="mr-2" href="#">
            <img
              className="rounded-full w-8 h-8"
              src={comment.author.profilePhoto}
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center">
            <Link to={`/profile/${comment.author.slug}`} className="text-sm font-bold mr-2" href="#">
                {comment.author.fullname} 
              </Link>
              <span className="text-gray-500 text-xs">{comment.moments}</span>
            </div>
            <p className="text-sm">{comment.text}</p>
            <div className="mt-2 flex items-center text-xs">
              <a className="flex items-center mr-2" href="#">
                <svg
                  className="fill-rose-600"
                  style={{ width: 20, height: 20 }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                </svg>
                <span className="ml-1">12</span>
              </a>
              <button className="py-1 px-2 text-xs font-medium hover:bg-gray-100 rounded-lg">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
