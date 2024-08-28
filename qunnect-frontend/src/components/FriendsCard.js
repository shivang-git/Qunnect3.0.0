import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isFriend } from "../features/auth/authSlice.js";

const FriendsCard = ({ friend }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const isFriendStatus = user.friends.includes(friend._id);
  
  const handleFollow = () => {
    dispatch(isFriend(friend._id));
  };
  return (
    <>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img
            alt=""
            src={friend.profilePhoto}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {friend.firstname} {friend.lastname}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {friend.email}
            </p>
          </div>
        </div>
        <div className="user-option mx-auto sm:ml-auto sm:mr-0">
          <button
            onClick={handleFollow}
            className={`btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0   
 ${
   isFriendStatus
     ? "bg-[#808080] hover:bg-[#606060] duration-300"
     : "bg-[#6911e7] hover:bg-[#590acb] duration-300"
 }`}
            type="button"
          >
            {isFriendStatus ? "Unfollow" : "Follow"}
          </button>
        </div>
      </li>
    </>
  );
};

export default FriendsCard;
