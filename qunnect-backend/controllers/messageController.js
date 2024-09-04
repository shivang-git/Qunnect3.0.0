import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const createConversation = async (req, res) => {
    const { senderId, recipientId } = req.body;

    try {
        // Check if a conversation already exists between the two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] }
        });
    
        if (conversation) {
            return res.status(200).json(conversation);
        }
    
        // If no conversation exists, create a new one
        conversation = new Conversation({
            participants: [senderId, recipientId]
        });
    
        const savedConversation = await conversation.save();
        res.status(201).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
    
};

export const getConversationMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};
