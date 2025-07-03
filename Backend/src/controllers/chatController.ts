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
    } catch (err) {
        console.log("DB error fetching mesages" + err)
        throw err;
    }
}

export const postIndivMessages = async(req: Request, res: Response) => {
    
    const {sender_id, receiver_id, message} = req.body;

    if(!sender_id || !receiver_id || !message){
         res.status(400).json({ error: "Missing required fields" });
    }
    
    const sql = `INSERT INTO indiv_messages (sender_id, receiver_id, message)
                    VALUES ($1, $2, $3);`;

    try{
        console.log("Before DB insert");
        const result = await query(sql, [sender_id, receiver_id, message]);
        console.log("After DB insert");
        res.status(200).json({
            message: "message sent"
        })
    }catch(err){
        console.log(err);
    }
}

//  SELECT sender_id, receiver_id, message, created_at FROM indiv_messages WHERE (sender_id = '2a2bdd88-3f3d-4efa-ab7c-da337ad0c1a2' AND receiver_id = '44704908-82a5-4aa2-b720-c12126508cc8') OR
//             (sender_id = '44704908-82a5-4aa2-b720-c12126508cc8' AND receiver_id = '2a2bdd88-3f3d-4efa-ab7c-da337ad0c1a2')
//         ORDER BY created_at ASC;

export const getIndivMessage = async(req: Request, res: Response) => {
    const {user1, user2} = req.query;
    const sql = `
 SELECT sender_id, receiver_id, message, created_at FROM indiv_messages WHERE (sender_id = '2a2bdd88-3f3d-4efa-ab7c-da337ad0c1a2' AND receiver_id = '44704908-82a5-4aa2-b720-c12126508cc8') OR
            (sender_id = '44704908-82a5-4aa2-b720-c12126508cc8' AND receiver_id = '2a2bdd88-3f3d-4efa-ab7c-da337ad0c1a2')
        ORDER BY created_at ASC;`

        try{
            const result = await query(sql, [user1, user2]);
            res.status(200).json(result.rows);
        }
        catch(err){
            console.log(err);
        }
          
}
