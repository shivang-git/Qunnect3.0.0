import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";

const Conversation = ({friend}) => {
  

    const [selectedConversation,setSelectedConversation]=useState(null);

    const handleConversation=(friend)=>{
      setSelectedConversation(friend);
      console.log(selectedConversation);
      
    }
//   useEffect(() => {
//     // Join the conversation room
//     socket.emit('joinRoom', { conversationId });

//     // Fetch all messages for this conversation
//     dispatch(fetchMessages(conversationId));

//     // Listen for new messages
//     socket.on('receiveMessage', (message) => {
//         dispatch(addMessage(message));
//     });

//     // Cleanup
//     return () => {
//         socket.off('receiveMessage');
//     };
// }, [conversationId, dispatch]);

// const handleSendMessage = () => {
//     const messageData = {
//         conversationId,
//         senderId,
//         text
//     };

//     socket.emit('sendMessage', messageData);
//     setText('');
// };

  return (
    <div  className={`flex flex-row items-center py-4 px-4 relative ${selectedConversation && selectedConversation.id === friend.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-200"}`} onClick={() => handleConversation(friend)}
>
            <div className="absolute text-xs text-gray-500 right-0 top-0 mr-6 mt-3">
              2 hours ago
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full font-bold flex-shrink-0">
            <img src={friend.profilePhoto} alt="" className='border-4 border-white rounded-full ml-2' />
            </div>
            <div className="flex flex-col flex-grow ml-3">
            <div className="flex items-center">
                <div className="text-sm font-medium">{friend.firstname} {friend.lastname}</div>
              <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />

              </div>

              <div className="text-xs truncate w-40">
                Good after noon! how can i help you?
              </div>
            </div>
            <div className="flex-shrink-0 ml-2 self-end mb-1 mr-2">
              <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                3
              </span>
            </div>
          
</div>
  )
}

export default Conversation

