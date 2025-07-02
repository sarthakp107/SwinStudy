import { Request, Response } from "express";
import { query } from "../database";

export const getAllChats = async (req: Request, res: Response) => {

    await res.send("Chat controller good");
}
export const getChatId = async (req: Request, res: Response) => {
    const id = req.params.id;
    await res.send(id);
}

export const saveMessages = async (req: Request, res: Response) => {

    const { unitName, sender, message } = req.body

    const sql = `
    INSERT INTO unit_messages (unit_name, sender, message)
    VALUES ($1, $2, $3);
  `;
    try {

        const result = await query(sql, [unitName, sender, message]);
        res.status(200).json({
            message: "reached here"
        })
    }
    catch (err) {
        console.log(err);
    }
};

export const getUnitChats = async (req: Request, res: Response) => {
    const { unitName } = req.query;
    const sql =
        `SELECT sender, message, created_at
     FROM unit_messages WHERE unit_name = $1
     ORDER BY created_at ASC`;
    try {
        const result = await query(sql, [unitName]);
        res.status(200).json(result.rows);
        console.log("fetching all the messages");
    } catch (err) {
        console.log("DB error fetching mesages" + err)
        throw err;
    }
}

export const postIndivMessages = async(req: Request, res: Response) => {
    
    const {sender_id, receiver_id, message} = req.body;

    console.log("Incoming request body:", req.body); 
    
    const sql = `INSERT INTO indiv_messages (sender_id, receiver_id, message)
                    VALUES ($1, $2, $3);`;

    try{
        const result = await query(sql, [sender_id, receiver_id, message]);
        res.status(200).json({
            message: "reached here"
        })
    }catch(err){
        console.log(err);
    }
}

