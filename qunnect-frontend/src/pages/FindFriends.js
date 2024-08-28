import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/users/userSlice.js";
import FriendsCard from "../components/FriendsCard.js";



const FindFriends = () => {
  const dispatch = useDispatch();
  
  const {isLoading}= useSelector((state) => state.users);
  const users = useSelector((state) => state.users.users);
  
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {isLoading ? (
        "Loading....."
      ) : users && users?.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {users?.map((friend) => (
           <FriendsCard key={friend._id} friend={friend}/>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
      </div>
    </>
  );
};

export default FindFriends;
