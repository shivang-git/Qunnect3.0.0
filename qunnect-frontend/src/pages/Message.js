import { useState, useCallback, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { MessageCircle, Send, Search, Menu, Phone, Video, UserPlus, MoreVertical } from "lucide-react";
import { debounce } from "lodash";
import { clearSearchResults, createConversation, getConversations, getMessages, searchContact, addMessage } from "../features/messages/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/messages');

const Message = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  
  const Contacts = useSelector((state) => state.messages.Contacts);
  const Conversations = useSelector((state) => state.messages.Conversations);
  const Messages = useSelector((state) => {
    if (selectedConversation && selectedConversation._id) {
      const conversation = state.messages.Conversations.find((conversation) => conversation._id === selectedConversation._id);
      return conversation ? conversation.messages : [];
    }
    return [];
  });

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      dispatch(addMessage({ conversationId: selectedConversation._id, message }));
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch, selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    const recipient=selectedConversation.participants[0];
    
    const newMessage = {
      conversationId: selectedConversation._id,
      senderId:user.user._id,
      recipientId:recipient._id,
      content: inputMessage,
      timestamp: new Date().toISOString(), // Add timestamp if needed
    };

    // Emit the sendMessage event to the server
    socket.emit('sendMessage', newMessage);

    // Clear input field after sending message
    setInputMessage("");
  };



  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    dispatch(getMessages(conversation._id));

  };



  const debouncedHandleInput = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        dispatch(clearSearchResults());
        return;
      }
      dispatch(searchContact(value));
    }, 600),
    [dispatch]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    debouncedHandleInput(value);
  };

  const handleAddUser = (user) => {
    dispatch(createConversation({ userId: user._id }));
    setIsSearchOpen(false);
    dispatch(clearSearchResults());
  };

  const ConversationList = () => (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      <ScrollArea className="flex-grow">
        {Conversations.map((conversation) => {
          const participant = conversation.participants[0]; // Assuming one-to-one chat
          return (
            <div
              key={conversation._id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedConversation?._id === conversation._id ? "bg-gray-100" : ""}`}
              onClick={() => handleConversationClick(conversation)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={participant.profilePhoto || `https://api.dicebear.com/6.x/initials/svg?seed=${participant.fullname}`} />
                    <AvatarFallback>{participant.fullname.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${participant.isOnline ? "bg-green-500" : "bg-gray-300"}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium truncate">{participant.fullname}</p>
                    <span className="text-xs text-gray-400">{conversation.timestamp || "Just now"}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.isTyping ? "Typing..." : conversation.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              <Search className="h-5 w-5 mr-2" />
              Search Users
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <Input type="text" placeholder="Search users..." onInput={handleSearch} />
              <ScrollArea className="h-[200px]">
                {Contacts.map((contact) => (
                  <div key={contact._id} className="flex items-center justify-between space-x-3 p-2 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.fullname}`} />
                        <AvatarFallback>{contact.fullname}</AvatarFallback>
                      </Avatar>
                      <span>{contact.fullname}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleAddUser(contact)}>
                      <UserPlus className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversation List Sidebar - Hidden on mobile, visible on tablet and larger */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4">
        <ConversationList />
      </div>
      <div className="flex flex-col w-full md:w-2/3 lg:w-3/4">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-4/5">
              <ConversationList />
            </SheetContent>
          </Sheet>
        </div>

        {/* Chat Window */}
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                {/* Optional Chat Header Content */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
                      <AvatarFallback>{selectedConversation.name}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${selectedConversation.isOnline ? "bg-green-500" : "bg-gray-300"}`}></span>
                  </div>
                  <p className="text-lg font-semibold">{selectedConversation.name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Display */}
            <ScrollArea className="flex-grow p-4">
              {Messages?.map((message, index) => (
                <div key={index} className={`my-2 ${message.senderId === "currentUserId" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block rounded-lg px-3 py-2 ${message.senderId === "currentUserId" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" className="ml-2">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Select a conversation to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default Message;
