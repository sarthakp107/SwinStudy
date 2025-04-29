import { Pool } from "pg"
import dotenv from "dotenv"
import { error } from "console"

dotenv.config()

const pool = new Pool({
    host: process.env.DB_IP,
    port: parseInt(process.env.DB_PORT || "1313", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export const query = (text: string, params: any[] = [])=>{
    return pool.query(text, params);
}

export const establishConnectionToDB =async ()=>{
    try{
        await pool.connect();
        console.log("Connected to Swin_DB")
    }catch{
        console.error('DB connection error: ', error)
    }
};