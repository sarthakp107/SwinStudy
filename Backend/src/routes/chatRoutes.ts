import express from 'express';
import { getUnitChats, saveMessages } from '../controllers/chatController';

const chatRouter = express.Router();

//chat
chatRouter.post("/postMessage", saveMessages)
chatRouter.get("/getUnitMessage" , getUnitChats );

 export default chatRouter;