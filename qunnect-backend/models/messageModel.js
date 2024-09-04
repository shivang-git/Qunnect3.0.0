import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // messageType:{
  //   type:String,
  //   enum:['text','file'],
  // },
  content: {
    type: String,
  },
  // fileUrl:{
  //   type:String,
  //   required:function(){
  //     return this.messageType==="file"
  //   }
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Message= mongoose.model('Message', messageSchema);
export default Message;