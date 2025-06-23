import express from 'express';
import { getAllChats, getChatId } from '../controllers/chatController';

const chatRouter = express.Router();


//chat
chatRouter.get("/" , getAllChats );
chatRouter.get("/:id", getChatId);


 export default chatRouter;