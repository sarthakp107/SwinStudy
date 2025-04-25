import express from 'express';
import dotenv from 'dotenv';
import {establishConnectionToDB, query} from './database'
import { error } from 'console';

dotenv.config();

const app = express();
const port = process.env.PORT || 1313;

app.use(express.json());

app.get("/api/getUnits", async (req, res)=>{
    try{
       const result = await query('SELECT * FROM all_units');
        res.json(result.rows);
    }catch{
        console.log("Error: ", error);
    }
})

app.get("/", (req, res)=>{
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
