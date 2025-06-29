import express from 'express';
import { getAllChats, getChatId } from '../controllers/chatController';
import { saveMessages } from '../models/messageModels';


const chatRouter = express.Router();


//chat
chatRouter.get("/" , getAllChats );
chatRouter.get("/:id", getChatId);
chatRouter.post("/postMessage", saveMessages)


 export default chatRouter;