import express from 'express';
import { getAllChats, getChatId, saveMessages } from '../controllers/chatController';

const chatRouter = express.Router();

//chat
chatRouter.post("/postMessage", saveMessages)
chatRouter.get("/" , getAllChats );
chatRouter.get("/:id", getChatId);

 export default chatRouter;