import React from "react";
import { Link } from "react-router-dom";

export const ProfileCard = ({user}) => {
  return (
    <>
      <>
        {/* component */}
       
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            {/* Banner Profile */}
            <div className="relative">
              <img
                src={user.user.profileBanner}
                alt="Banner Profile"
                className="w-full rounded-t-lg"
              />
              <img
                src={user.user.profilePhoto}
                alt="Profile Picture"
                className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
              />
            </div>
            {/* User Info with Verified Button */}
            <div className="flex items-center mt-12">
              <h2 className="text-xl font-bold text-gray-800 hover:underline">
              <Link to='/profile'>{user.user.firstname}{" "}{user.user.lastname}</Link>
              </h2>
              <button className=" px-2 py-1 rounded-full">
                <svg
                  fill="#4d9aff"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="16px"
                  height="16px"
                  viewBox="0 0 536.541 536.541"
                  xmlSpace="preserve"
                  stroke="#4d9aff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M496.785,152.779c-3.305-25.085-16.549-51.934-38.826-74.205c-22.264-22.265-49.107-35.508-74.186-38.813 c-11.348-1.499-26.5-7.766-35.582-14.737C328.111,9.626,299.764,0,268.27,0s-59.841,9.626-79.921,25.024 c-9.082,6.965-24.235,13.238-35.582,14.737c-25.08,3.305-51.922,16.549-74.187,38.813c-22.277,22.271-35.521,49.119-38.825,74.205 c-1.493,11.347-7.766,26.494-14.731,35.57C9.621,208.422,0,236.776,0,268.27s9.621,59.847,25.024,79.921 c6.971,9.082,13.238,24.223,14.731,35.568c3.305,25.086,16.548,51.936,38.825,74.205c22.265,22.266,49.107,35.51,74.187,38.814 c11.347,1.498,26.5,7.771,35.582,14.736c20.073,15.398,48.421,25.025,79.921,25.025s59.841-9.627,79.921-25.025 c9.082-6.965,24.234-13.238,35.582-14.736c25.078-3.305,51.922-16.549,74.186-38.814c22.277-22.27,35.521-49.119,38.826-74.205 c1.492-11.346,7.766-26.492,14.73-35.568c15.404-20.074,25.025-48.422,25.025-79.921c0-31.494-9.621-59.848-25.025-79.921 C504.545,179.273,498.277,164.126,496.785,152.779z M439.256,180.43L246.477,373.209l-30.845,30.846 c-8.519,8.52-22.326,8.52-30.845,0l-30.845-30.846l-56.665-56.658c-8.519-8.52-8.519-22.326,0-30.846l30.845-30.844 c8.519-8.519,22.326-8.519,30.845,0l41.237,41.236L377.561,118.74c8.52-8.519,22.326-8.519,30.846,0l30.844,30.845 C447.775,158.104,447.775,171.917,439.256,180.43z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
            {/* Bio */}
            <p className="text-gray-700 mt-2">
             {user.bio}
            </p>
            {/* Social Links */}
            <div className="flex items-center mt-4 space-x-4">
              <a href="#" className="text-blue-500 hover:underline">
                {" "}
                Twitter{" "}
              </a>
              <a href="#" className="text-blue-500 hover:underline">
                {" "}
                GitHub{" "}
              </a>
              <a href="#" className="text-blue-500 hover:underline">
                {" "}
                LinkedIn{" "}
              </a>
            </div>
            {/* Separator Line */}
            <hr className="my-4 border-t border-gray-300" />
            {/* Stats */}
            <div className="flex justify-between text-gray-600 mx-2">
              <div className="text-center">
                <span className="block font-bold text-lg">1.5k</span>
                <span className="text-xs">Followers</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg">120</span>
                <span className="text-xs">Following</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg">350</span>
                <span className="text-xs">Posts</span>
              </div>
            </div>
          </div>

      </>
    </>
  );
};
