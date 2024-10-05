import { Server } from "socket.io";
import Message from "../models/messageModel.js";
import User from "../";

export const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle joining a room
    socket.on("joinRoom", ({ conversationId }) => {
        socket.join(conversationId);
        console.log(`User joined room: ${conversationId}`);
    });

    // Handle sending a message
    socket.on("sendMessage", async ({ conversationId, senderId, recipientId, content }) => {
      console.log('recieved');
      
        const newMessage = {
            conversationId: conversationId, // Use conversationId directly from the event
            content: content, // Use content from the event
            timestamp: new Date().toISOString(), // Add timestamp
            senderId: senderId, // Include senderId
            recipientId: recipientId // Include recipientId
        };

        // Create a new message document
        const messageInstance = new Message(newMessage);

        try {
            const savedMessage = await messageInstance.save(); // Save to database
            // Emit the saved message to all users in the room
            io.to(conversationId).emit("receiveMessage", savedMessage);
            console.log(`Message sent from ${senderId} to ${recipientId} in conversation ${conversationId}`);
        } catch (err) {
            console.error("Error saving message:", err);
        }
    });

    // Handle message retrieval request (if needed)
    socket.on("getMessages", async (conversationId) => {
        try {
            const messages = await Message.find({ conversationId });
            // Emit the messages back to the user
            socket.emit("loadMessages", { conversationId, messages });
        } catch (err) {
            console.error("Error retrieving messages:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
};

