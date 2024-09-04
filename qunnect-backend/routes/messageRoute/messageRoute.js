import express from 'express';


import { AuthMiddleware } from '../../middlewares/authMiddleware.js';
import { getConversationMessages,createConversation} from '../../controllers/messageController.js';

const router=express.Router();

router.post('/create-conversation',AuthMiddleware, createConversation);
router.get('/:conversationId',AuthMiddleware, getConversationMessages);


export default router;
