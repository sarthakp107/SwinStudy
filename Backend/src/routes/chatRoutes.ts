import express from 'express';
import { getIndivMessage, getUnitChats, postIndivMessages, saveMessages } from '../controllers/chatController';

const chatRouter = express.Router();

//chat
chatRouter.post("/postMessage", saveMessages)
chatRouter.get("/getUnitMessage" , getUnitChats );
chatRouter.post("/postIndividualMessage", postIndivMessages);
chatRouter.get("/getIndividualMessage", getIndivMessage);

 export default chatRouter;