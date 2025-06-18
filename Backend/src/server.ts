import express from 'express';
import dotenv from 'dotenv';
import {establishConnectionToDB, query} from './database'
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import unitRoutes from "./routes/unitRoutes"

dotenv.config();

const app = express();
const port = process.env.PORT || 1313;

app.use(express.json());
app.use(cors());
app.use(helmet()); // for security reasons; adds different HTTP headers
app.use(morgan("dev")); // logs the requests 


app.use("/api/units", unitRoutes )

app.get("/", (req, res)=>{
    console.log(res.getHeaders());
    res.send("Welcome to SwinStudy!");
})

async function startServer() {
    try{
        await establishConnectionToDB();
        app.listen(port, ()=>{console.log('Connected to Swin_Express', port)})
    }catch(error){
        console.error('Failed starting server: ', error)
    }
}

startServer();
