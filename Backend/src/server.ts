import express from 'express';
import dotenv from 'dotenv';
import {establishConnectionToDB, query} from './database'
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import unitRoutes from "./routes/unitRoutes"
import chatRoutes from "./routes/chatRoutes"

import { Server } from 'socket.io';
import { handleGroupChat } from './sockets/groupChat';
import flashcardRoutes from "./routes/flashcardRoutes"
import { createServer } from 'http';
import { handleIndivChat } from './sockets/indivChats';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "1313", 10);


app.use(express.json());
app.use(cors());
app.use(helmet()); // for security reasons; adds different HTTP headers
app.use(morgan("dev")); // logs the requests


app.use("/api/units", unitRoutes )
app.use("/", unitRoutes)

//chats
app.use("/chat", chatRoutes);

//flashcards
app.use("/flashcards", flashcardRoutes);


const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:5173",
    // origin: process.env.CORS_ORIGIN,
    origin: "*",
    // origin:"https://swinstudy.com",
    methods: ["GET", "POST"]
  }
});

handleGroupChat(io);
handleIndivChat(io);

async function startServer() {
    try{
        await establishConnectionToDB();
        httpServer.listen(port, "0.0.0.0", ()=>{console.log("Connected to Swin_Express", port)})
    }catch(error){
        console.error('Failed starting server: ', error)
    }
}

startServer();


