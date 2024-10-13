'use client'

import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { io } from 'socket.io-client';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Send, Search, Menu, Phone, Video, UserPlus, MoreVertical,Plus } from "lucide-react";
import { clearSearchResults, createConversation, getConversations, getMessages, searchContact, addMessage } from "../features/messages/messageSlice";


const socket = io(process.env.REACT_APP_HOST, {
  transports: ['websocket']  // Force WebSocket transport
});


export default function Message() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const chatEndRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const Contacts = useSelector((state) => state.messages.Contacts);
  const Conversations = useSelector((state) => state.messages.Conversations);
  const Messages = useSelector((state) => {
    if (!selectedConversation || !selectedConversation._id) return [];
    return state.messages?.Chats?.[selectedConversation._id] || [];
  });

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      socket.emit('joinRoom', { conversationId: selectedConversation._id });
      const handleReceiveMessage = (message) => {
        if (message.conversationId === selectedConversation._id) {
          dispatch(addMessage({ conversationId: selectedConversation._id, message }));
        }
      };
      socket.on('receiveMessage', handleReceiveMessage);
      return () => socket.off('receiveMessage', handleReceiveMessage);
    }
  }, [dispatch, selectedConversation]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    const newMessage = {
      conversationId: selectedConversation._id,
      senderId: user.user._id,
      recipientId: selectedConversation.participants[0]._id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    // Only emit the message through the socket
    socket.emit('sendMessage', newMessage);
    setInputMessage("");
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    dispatch(getMessages(conversation._id));
  };

  const debouncedHandleInput = useCallback(debounce((value) => {
    if (value.trim() === "") {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(searchContact(value));
  }, 600), [dispatch]);

  const handleSearch = (e) => debouncedHandleInput(e.target.value);

  const handleAddUser = (user) => {
    dispatch(createConversation({ userId: user._id }));
    setIsSearchOpen(false);
    dispatch(clearSearchResults());
  };

  const ConversationList = useMemo(() => (
    <ScrollArea className="h-[calc(100vh-140px)]">
      {Conversations.map((conversation) => {
        const participant = conversation.participants[0];
        return (
          <div
            key={conversation._id}
            className={`p-3 cursor-pointer hover:bg-gray-100 ${selectedConversation?._id === conversation._id ? "bg-gray-100" : ""}`}
            onClick={() => handleConversationClick(conversation)}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={participant.profilePhoto || `https://api.dicebear.com/6.x/initials/svg?seed=${participant.fullname}`}
                />
                <AvatarFallback>{participant.fullname.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{participant.fullname}</p>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage || "No messages yet"}</p>
              </div>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  ), [Conversations, selectedConversation, handleConversationClick]);

  return (
    <div className="flex h-[calc(100vh-66px)] bg-gray-100 p-4">
      <div className="hidden md:block md:w-80 bg-white border-r rounded-l-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Plus className="h-5 w-5" />
                <span className="sr-only">New Message</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start" side="right">
              <div className="p-4 space-y-4">
                <h3 className="font-medium leading-none">New Message</h3>
                <Input type="text" placeholder="Search users..." onChange={handleSearch} />
                <ScrollArea className="h-[300px] overflow-y-auto">
                  {Contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.fullname}`}
                          />
                          <AvatarFallback>{contact.fullname}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{contact.fullname}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleAddUser(contact)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {ConversationList}
      </div>
      <div className="flex flex-col flex-1 bg-white rounded-r-lg overflow-hidden">
        <div className="p-4 border-b bg-white md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              {ConversationList}
            </SheetContent>
          </Sheet>
        </div>
        {selectedConversation ? (
          <>
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.participants[0].profilePhoto} />
                  <AvatarFallback>{selectedConversation.participants[0].fullname}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{selectedConversation.participants[0].fullname}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              {Messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex my-2 ${message.senderId === user.user._id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block rounded-lg px-3 py-2 max-w-xs break-words ${
                      message.senderId === user.user._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}

