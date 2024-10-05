import express from 'express';


import { AuthMiddleware } from '../../middlewares/authMiddleware.js';
import { getConversationMessages,createConversation, getConversations} from '../../controllers/messageController.js';

const router=express.Router();

router.get('/get-conversation',AuthMiddleware, getConversations);
router.get('/:conversationId',AuthMiddleware, getConversationMessages);
router.post('/create-conversation',AuthMiddleware, createConversation);


export default router;
