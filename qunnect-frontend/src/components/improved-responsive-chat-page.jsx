'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MessageCircle, Send, Search, Menu, Phone, Video, UserPlus } from "lucide-react"

// Mock data for conversations
const initialConversations = [
  { id: 1, name: "Alice Smith", lastMessage: "Hey, how are you?", timestamp: "10:30 AM", isOnline: true, isTyping: false },
  { id: 2, name: "Bob Johnson", lastMessage: "Did you see the game last night?", timestamp: "Yesterday", isOnline: false, isTyping: false },
  { id: 3, name: "Charlie Brown", lastMessage: "Let's meet up this weekend", timestamp: "2 days ago", isOnline: true, isTyping: true },
]

// Mock data for messages
const mockMessages = [
  { id: 1, sender: "Alice Smith", content: "Hey, how are you?", timestamp: "10:30 AM" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
  { id: 3, sender: "Alice Smith", content: "Doing great! Any plans for the weekend?", timestamp: "10:32 AM" },
]

// Mock data for user search
const mockUsers = [
  { id: 4, name: "David Wilson" },
  { id: 5, name: "Emma Thompson" },
  { id: 6, name: "Frank Miller" },
]

export function ImprovedResponsiveChatPage() {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation)
    setMessages(mockMessages)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() === "") return
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setInputMessage("")
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleAddUser = (user) => {
    const newConversation = {
      id: user.id,
      name: user.name,
      lastMessage: "New conversation",
      timestamp: "Just now",
      isOnline: false,
      isTyping: false
    }
    setConversations([newConversation, ...conversations])
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !conversations.some(conv => conv.id === user.id))

  const ConversationList = () => (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      <ScrollArea className="flex-grow">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleConversationClick(conversation)}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.name}`} />
                  <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${conversation.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">{conversation.name}</p>
                  <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.isTyping ? 'Typing...' : conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
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
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)} />
              <ScrollArea className="h-[200px]">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between space-x-3 p-2 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleAddUser(user)}>
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
  )

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Conversation List Sidebar - Hidden on mobile, visible on tablet and larger */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4">
        <ConversationList />
      </div>
      {/* Chat Window */}
      <div className="flex flex-col w-full md:w-2/3 lg:w-3/4">
        {/* Chat Header - Always visible on mobile */}
        <div
          className="p-4 border-b border-gray-200 bg-white flex items-center justify-between md:hidden">
          <h2 className="text-xl font-semibold">Chat</h2>
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

        {selectedConversation ? (
          <>
            {/* Chat Header for selected conversation */}
            <div className="p-4 border-b border-gray-200 bg-white hidden md:block">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
                      <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${selectedConversation.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedConversation.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.isOnline ? (selectedConversation.isTyping ? 'Typing...' : 'Online') : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Voice call</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                    <span className="sr-only">Video call</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 text-gray-400">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1" />
                <Button type="submit">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-gray-400" />
              <p className="mt-4 text-lg text-gray-600">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>)
  );
}