
import React, { useState } from "react";
import { User, MessageCircle, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const friends = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  // Add more friends as needed
];

const Explore = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedFriend) {
      setChats((prevChats) => ({
        ...prevChats,
        [selectedFriend.id]: [
          ...(prevChats[selectedFriend.id] || []),
          { text: message, sender: "you" },
        ],
      }));
      setMessage("");
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 border-r bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => handleSelectFriend(friend)}
              className={`flex items-center p-2 mb-2 cursor-pointer rounded-lg ${
                selectedFriend && selectedFriend.id === friend.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-200"
              }`}
            >
              <User className="mr-2 h-6 w-6" />
              <span className="text-lg">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {selectedFriend ? (
          <>
            <div className="flex items-center mb-4">
              <MessageCircle className="mr-2 h-6 w-6" />
              <h2 className="text-xl font-semibold">{selectedFriend.name}</h2>
            </div>
            <div className="flex flex-col space-y-4 mb-4 p-4 bg-gray-50 rounded-lg h-[70vh] overflow-y-auto">
              {(chats[selectedFriend.id] || []).map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.sender === "you" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      chat.sender === "you"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                className="flex-grow"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Select a friend to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
