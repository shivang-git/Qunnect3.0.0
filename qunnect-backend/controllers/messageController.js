import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
//done
export const createConversation = async (req, res) => {
    const senderId=req.user.id;
    const recipientId = req.body.userId;
    

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


//done
export const getConversations = async (req, res) => {
    const userId = req.user.id;
  
    try {
      // Find all conversations where the current user is a participant
      let conversations = await Conversation.find({
        participants: { $in: [userId] }
      })
      .populate({
        path: 'participants',
        select: 'fullname profilePhoto', // Select the fields you need
      });
  
      if (conversations && conversations.length > 0) {
        // Remove the current user's data from the participants list in each conversation
        const filteredConversations = conversations.map(conversation => {
          const filteredParticipants = conversation.participants.filter(
            participant => participant._id.toString() !== userId
          );
          return {
            ...conversation.toObject(), // Convert to plain object if needed
            participants: filteredParticipants,
          };
        });
  
        return res.status(200).json(filteredConversations);
      } else {
        return res.status(404).json({ message: "No conversations found" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  


// done
export const getConversationMessages = async (req, res) => {
    const { conversationId } = req.params;  
    console.log(conversationId);
      
    try {
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        res.status(200).json({messages,conversationId});
    } catch (err) {
        res.status(500).json(err);
    }
};
