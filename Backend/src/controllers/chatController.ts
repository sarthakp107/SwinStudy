import { Request, Response } from "express";
import { query } from "../database";

export const getAllChats = async(req: Request, res : Response) => {

    await res.send("Chat controller good");
}
export const getChatId = async(req: Request, res : Response) => {
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
    console.log("reached here at message model");
    res.status(200).json({
      message: "reached here"
    })
  }
  catch (err) {
    console.log(err);
  }
};

