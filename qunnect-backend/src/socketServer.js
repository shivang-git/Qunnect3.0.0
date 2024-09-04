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

    socket.on("joinRoom", ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`User joined room: ${conversationId}`);
    });

    socket.on(
      "sendMessage",
      async ({ conversationId, senderId, recipientId, content }) => {
        const newMessage = new Message({
          conversationId,
          senderId,
          recipientId,
          content,
        });

        try {
          const savedMessage = await newMessage.save();
          io.to(conversationId).emit("receiveMessage", savedMessage);
        } catch (err) {
          console.error(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

