import React, { useState } from "react";

const PostCard = () => {
  const [allcmts, setallcmts] = useState(false);

  const handleAllCmts = () => {
    setallcmts(!allcmts);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md pb-4 mb-6">
        {/* User Info with Three-Dot Menu */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://placekitten.com/40/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">John Doe</p>
              <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
            </div>
          </div>
          <div className="text-gray-500 cursor-pointer">
            {/* Three-dot menu icon */}
            <button className="hover:bg-gray-50 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
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
        <div className="mb-4">
          <p className="text-gray-800">
            Just another day with adorable kittens! 🐱{" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam a tempore omnis necessitatibus, dignissimos atque quas incidunt eum, nam repellat quos optio libero sequi.
          </p>
        </div>
        {/* Image */}
        <div className="mb-4">
          <img
            src="/wp1828914-programmer-wallpapers.jpg"
            alt="Post Image"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        {/* Like and Comment Section */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>42 Likes</span>
            </button>
          </div>
          <button
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
            onClick={() => {
              handleAllCmts();
            }}
          >
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                />
              </g>
            </svg>
            <span>3 Comment</span>
          </button>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="relative">
          <input
            className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-white-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
            type="text"
            placeholder="Write a comment"
          />
          <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
            <svg
              className="mr-2"
              style={{ width: 26, height: 26, cursor: "pointer" }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
              ></path>
            </svg>
            <svg
              className="fill-blue-500 dark:fill-black-50"
              style={{ width: 24, height: 24, cursor: "pointer" }}
              viewBox="0 0 24 24"
            >
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </span>
        </div>
        <div className={`mt-4 all-cmt-block ${allcmts ? "visible" : "hidden"}`}>
          <p className="text-gray-800 font-semibold">Comment</p>
          <hr className="mt-2 mb-2" />
          <>
            {/* Comments content */}
            <div className="pt-6">
              {/* Comment row */}
              <div className="media flex pb-4">
                <a className="mr-4" href="#">
                  <img
                    className="rounded-full max-w-none w-12 h-12"
                    src="https://randomuser.me/api/portraits/men/82.jpg"
                  />
                </a>
                <div className="media-body">
                  <div>
                    <a
                      className="inline-block text-base font-bold mr-2"
                      href="#"
                    >
                      Leslie Alexander
                    </a>
                    <span className="text-slate-500 dark:text-slate-400">
                      25 minutes ago
                    </span>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur.</p>
                  <div className="mt-2 flex items-center">
                    <a className="inline-flex items-center py-2 mr-3" href="#">
                      <span className="mr-2">
                        <svg
                          className="fill-rose-600 dark:fill-rose-400"
                          style={{ width: 22, height: 22 }}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                        </svg>
                      </span>
                      <span className="text-base font-bold">12</span>
                    </a>
                    <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-blue-500 hover:text-white rounded-lg">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              {/* End comments row */}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default PostCard;
