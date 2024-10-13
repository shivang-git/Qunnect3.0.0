import { Server } from "socket.io";
import Message from "../models/messageModel.js";

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
      const newMessage = {
        conversationId,
        content,
        timestamp: new Date().toISOString(),
        senderId,
        recipientId,
      };

      const messageInstance = new Message(newMessage);

      try {
        const savedMessage = await messageInstance.save();
        io.to(conversationId).emit("receiveMessage", savedMessage);
        console.log(`Message sent from ${senderId} to ${recipientId} in conversation ${conversationId}`);
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("messageError", { error: "Message could not be sent." }); // Emit error to client
      }
    });

    // Handle message retrieval request (if needed)
    socket.on("getMessages", async (conversationId) => {
      try {
        const messages = await Message.find({ conversationId });
        socket.emit("loadMessages", { conversationId, messages });
      } catch (err) {
        console.error("Error retrieving messages:", err);
        socket.emit("messageError", { error: "Could not load messages." }); // Emit error to client
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
