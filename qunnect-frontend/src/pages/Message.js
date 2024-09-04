import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../features/users/userSlice";
import Conversation from "../components/Converstation";
import MsgHistory from "../components/MsgHistory";
import ContactSearch from "../components/ContactSearch";

const Message = () => {
  const dispatch = useDispatch();
  const [selectedConversation,setSelectedConversation]=useState(null);
  const friends = useSelector((state) => state.users.friends);

  const chats = false;
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <>
      <div className="flex flex-row mt-10 h-screen justify-center antialiased text-gray-800">
        <div className="flex flex-row w-96 h-4/5 flex-shrink-0 bg-gray-100 p-4">
          <div className="flex flex-col w-full h-full pl-2 pr-2 py-4 -mr-4">
            <div className="flex flex-row items-center">
              <div className="text-xl font-semibold">Messages</div>
              <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
                5
              </div>
            </div>
            <div className="mt-5">
              <ul className="flex flex-row items-center justify-between">
                <li>
                  <a
                    href="#"
                    className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800"
                  >
                    <span>All Conversations</span>
                    <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
                  </a>
                </li>
                {/* <li>
            <a
              href="#"
              className="flex items-center pb-3 text-xs text-gray-700 font-semibold"
            >
              <span>Archived</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center pb-3 text-xs text-gray-700 font-semibold"
            >
              <span>Starred</span>
            </a>
          </li> */}
              </ul>
            </div>

            {/* {"Conversations"} */}
            <div className="h-full overflow-hidden relative pt-2 px-1">
              <div className="flex flex-col divide-y h-full overflow-y-auto -mx-5 ">
                {friends?.map((friend) => (
                  <Conversation key={friend._id} friend={friend} />
                ))}
              </div>

              <div className="absolute bottom-0 right-0 mr-2">
              <ContactSearch />
              </div>
            </div>
          </div>
        </div>

        {/* Message and use history */}
        <div className="flex flex-col h-4/5 w-3/6 bg-white px-4 py-6  border-solid border-2 border-grey-600">
          {!chats ? (
            <MsgHistory />
          ) : (
            "Qunnect to the Your Friends and Family...."
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
